import pino from "pino";

import { env } from "../../config/env.js";

const baseOptions = {
  level: env.NODE_ENV === "production" ? "info" : "debug"
};

export const logger =
  env.NODE_ENV === "development"
    ? pino({
        ...baseOptions,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname"
          }
        }
      })
    : pino(baseOptions);