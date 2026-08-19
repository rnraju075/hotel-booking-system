import {
  Router
} from "express";

import {
  env
} from "../../config/env.js";

import {
  logger
} from "../../infrastructure/logger/logger.js";

import {
  healthService
} from "./health.service.js";

export const healthRouter =
  Router();

healthRouter.get(
  "/",
  (_req, res) => {
    res.status(200).json({
      success: true,
      service:
        "hotel-booking-api",
      status:
        "ok",
      environment:
        env.NODE_ENV,
      timestamp:
        new Date().toISOString()
    });
  }
);

healthRouter.get(
  "/ready",
  async (_req, res) => {
    try {
      await healthService
        .checkDatabase();

      res.status(200).json({
        success: true,
        status: "ready",
        database:
          "connected"
      });
    } catch (error) {
      logger.error(
        {
          err: error
        },
        "Database readiness check failed"
      );

      res.status(503).json({
        success: false,
        status:
          "not_ready",
        database:
          "unavailable"
      });
    }
  }
);