import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  CORS_ORIGIN: z
    .string()
    .default("http://localhost:5173,https://anshul-rawat-portfolio.vercel.app"),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z
    .string()
    .default("false")
    .transform((value) => value === "true"),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid backend environment variables");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

const smtpConfigured = Boolean(
  parsedEnv.data.CONTACT_FROM_EMAIL &&
    parsedEnv.data.SMTP_HOST &&
    parsedEnv.data.SMTP_USER &&
    parsedEnv.data.SMTP_PASS
);

const resendConfigured = Boolean(
  parsedEnv.data.RESEND_API_KEY &&
    (parsedEnv.data.RESEND_FROM_EMAIL || parsedEnv.data.CONTACT_FROM_EMAIL)
);

const contactToEmail = parsedEnv.data.CONTACT_TO_EMAIL || parsedEnv.data.ADMIN_EMAIL;

if (!contactToEmail) {
  console.error("Invalid backend environment variables");
  console.error({
    CONTACT_TO_EMAIL: ["Provide CONTACT_TO_EMAIL or ADMIN_EMAIL."]
  });
  process.exit(1);
}

if (!smtpConfigured && !resendConfigured) {
  console.error("Invalid backend environment variables");
  console.error({
    mailProvider: [
      "Configure either SMTP_HOST/SMTP_USER/SMTP_PASS/CONTACT_FROM_EMAIL or RESEND_API_KEY with RESEND_FROM_EMAIL."
    ]
  });
  process.exit(1);
}

export const env = {
  ...parsedEnv.data,
  CONTACT_TO_EMAIL: contactToEmail,
  smtpConfigured,
  resendConfigured
};
