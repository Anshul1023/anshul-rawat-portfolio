import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  CONTACT_TO_EMAIL: z.string().email(),
  CONTACT_FROM_EMAIL: z.string().email(),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z
    .string()
    .default("false")
    .transform((value) => value === "true"),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid backend environment variables");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;

