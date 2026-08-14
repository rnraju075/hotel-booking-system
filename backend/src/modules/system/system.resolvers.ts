import type { GraphQLContext } from "../../infrastructure/graphql/graphql-context.js";

import type { SystemService } from "./system.service.js";

export function createSystemResolvers(
  systemService: SystemService
) {
  return {
    Query: {
      apiStatus: (
        _parent: unknown,
        _args: Record<string, never>,
        context: GraphQLContext
      ) => {
        return systemService.getApiStatus(
          context.requestId
        );
      }
    }
  };
}