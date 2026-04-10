import nodemailer from "nodemailer";

import { env } from "../config/env.js";

const transporter = env.smtpConfigured
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    })
  : null;

async function sendWithResend({ name, email, message }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `New portfolio inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 12px;">New portfolio inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n")
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend request failed: ${details}`);
  }

  return response.json();
}

export async function sendPortfolioEmail({ name, email, message }) {
  if (env.resendConfigured) {
    return sendWithResend({ name, email, message });
  }

  return transporter.sendMail({
    from: `"Anshul Portfolio" <${env.CONTACT_FROM_EMAIL}>`,
    to: env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 12px;">New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line;">${message}</p>
      </div>
    `
  });
}
