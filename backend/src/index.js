import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.js";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((item) => item.trim()),
    methods: ["GET", "POST"]
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_request, response) => {
  response.status(200).json({
    success: true,
    status: "ok"
  });
});

app.use("/", contactRouter);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Portfolio backend listening on http://localhost:${env.PORT}`);
});
