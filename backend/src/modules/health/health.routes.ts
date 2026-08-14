import { Router } from "express";

import { env } from "../../config/env.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "hotel-booking-api",
    status: "ok",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});