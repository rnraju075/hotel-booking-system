import {
  ApolloServer
} from "@apollo/server";

import {
  ApolloServerPluginDrainHttpServer
} from "@apollo/server/plugin/drainHttpServer";

import type {
  Server
} from "node:http";

import type {
  ApplicationContainer
} from "../../app/application-container.js";

import {
  systemTypeDefs
} from "../../modules/system/system.schema.js";

import {
  createSystemResolvers
} from "../../modules/system/system.resolvers.js";

import type {
  GraphQLContext
} from "./graphql-context.js";

export function createGraphQLServer(
  httpServer: Server,
  container:
    ApplicationContainer
): ApolloServer<GraphQLContext> {

  return new ApolloServer<
    GraphQLContext
  >({

    typeDefs:
      systemTypeDefs,

    resolvers:
      createSystemResolvers(
        container.systemService
      ),

    plugins: [
      ApolloServerPluginDrainHttpServer({
        httpServer
      })
    ]
  });
}