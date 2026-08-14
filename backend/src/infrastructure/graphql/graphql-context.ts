import { randomUUID } from "node:crypto";

import type {
  Request,
  Response
} from "express";

export interface GraphQLContext {
  req: Request;
  res: Response;
  requestId: string;
}

export function createGraphQLContext(
  req: Request,
  res: Response
): GraphQLContext {
  const incomingRequestId =
    req.headers["x-request-id"];

  const requestId =
    typeof incomingRequestId === "string" &&
    incomingRequestId.trim().length > 0
      ? incomingRequestId
      : randomUUID();

  return {
    req,
    res,
    requestId
  };
}