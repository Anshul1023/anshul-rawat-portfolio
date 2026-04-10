import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";

import { sendPortfolioEmail } from "../services/emailService.js";

const router = Router();

const messageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be under 80 characters."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Message should be at least 20 characters.")
    .max(2000, "Message should be under 2000 characters.")
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages from this device. Please try again in a few minutes."
  }
});

router.post("/send-email", contactLimiter, async (request, response, next) => {
  try {
    const parsed = messageSchema.safeParse(request.body);

    if (!parsed.success) {
      return response.status(400).json({
        success: false,
        message: "Please correct the highlighted fields and try again.",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    const normalizedMessage = parsed.data.message.replace(/\r\n/g, "\n");

    await sendPortfolioEmail({
      ...parsed.data,
      message: normalizedMessage
    });

    return response.status(200).json({
      success: true,
      message: "Message sent successfully. Thanks for reaching out."
    });
  } catch (error) {
    error.statusCode = 500;
    error.publicMessage =
      "The message could not be sent right now. Please email Anshul directly.";
    return next(error);
  }
});

export { router as contactRouter };

