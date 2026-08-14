export const systemTypeDefs = `#graphql
  type ApiStatus {
    service: String!
    status: String!
    environment: String!
    timestamp: String!
    requestId: ID!
  }

  type Query {
    apiStatus: ApiStatus!
  }
`;