import type { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import express, { type Express } from "express";

import cors from "cors";
import helmet from "helmet";
import { pinoHttp } from "pino-http";

import { env } from "./config/env.js";

import { logger } from "./infrastructure/logger/logger.js";

import {
  createGraphQLContext,
  type GraphQLContext,
} from "./infrastructure/graphql/graphql-context.js";

import { healthRouter } from "./modules/health/health.routes.js";
import { errorHandler } from "./common/middleware/error-handler.middleware.js";
import { notFoundHandler } from "./common/middleware/not-found.middleware.js";

export function createExpressApp(): Express {
  return express();
}

export function configureExpressApp(
  app: Express,
  apolloServer: ApolloServer<GraphQLContext>,
): void {
  app.use(
    pinoHttp({
      logger,
    }),
  );

  app.disable("x-powered-by");

if (env.NODE_ENV === "development") {
  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  );
} else {
  app.use(
    helmet()
  );
}

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.use(
    express.json({
      limit: "1mb",
    }),
  );

  app.use(
    express.urlencoded({
      extended: true,
      limit: "1mb",
    }),
  );

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "Hotel Booking API is running",
    });
  });

  app.use("/health", healthRouter);

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => createGraphQLContext(req, res),
    }),
  );

  app.use(notFoundHandler);

  app.use(errorHandler);
}
