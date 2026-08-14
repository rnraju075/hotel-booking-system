import { createServer } from "node:http";

import {
  configureExpressApp,
  createExpressApp
} from "./app.js";

import { env } from "./config/env.js";

import { createGraphQLServer } from "./infrastructure/graphql/graphql-server.js";

import { logger } from "./infrastructure/logger/logger.js";

const app =
  createExpressApp();

const httpServer =
  createServer(app);

const apolloServer =
  createGraphQLServer(
    httpServer
  );

await apolloServer.start();

configureExpressApp(
  app,
  apolloServer
);

httpServer.listen(
  env.PORT,
  () => {
    logger.info(
      {
        port: env.PORT,
        environment:
          env.NODE_ENV,

        graphql:
          `http://localhost:${env.PORT}/graphql`
      },
      "Hotel Booking API started"
    );
  }
);

let shuttingDown = false;

const shutdown = async (
  signal: NodeJS.Signals
): Promise<void> => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;

  logger.info(
    {
      signal
    },
    "Shutdown signal received"
  );

  try {
    await apolloServer.stop();

    logger.info(
      "Application shut down successfully"
    );
  } catch (error) {
    logger.error(
      {
        err: error
      },
      "Application shutdown failed"
    );

    process.exitCode = 1;
  }
};

process.once(
  "SIGINT",
  () => {
    void shutdown("SIGINT");
  }
);

process.once(
  "SIGTERM",
  () => {
    void shutdown("SIGTERM");
  }
);