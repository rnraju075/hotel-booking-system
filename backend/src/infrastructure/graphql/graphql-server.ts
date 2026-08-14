import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import type { Server } from "node:http";

import { env } from "../../config/env.js";

import { systemTypeDefs } from "../../modules/system/system.schema.js";
import { SystemService } from "../../modules/system/system.service.js";
import { createSystemResolvers } from "../../modules/system/system.resolvers.js";

import type { GraphQLContext } from "./graphql-context.js";

export function createGraphQLServer(
  httpServer: Server
): ApolloServer<GraphQLContext> {
  const systemService =
    new SystemService();

  return new ApolloServer<GraphQLContext>({
    typeDefs: systemTypeDefs,

    resolvers:
      createSystemResolvers(
        systemService
      ),

    introspection:
      env.NODE_ENV !== "production",

    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer
      })
    ]
  });
}