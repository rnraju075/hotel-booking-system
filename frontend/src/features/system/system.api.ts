import {
  graphqlRequest
} from "../../api/graphql-client";

export interface ApiStatus {
  service: string;
  status: string;
  environment: string;
  timestamp: string;
  requestId: string;
}

interface GetApiStatusResponse {
  apiStatus: ApiStatus;
}

const GET_API_STATUS = `
  query GetApiStatus {
    apiStatus {
      service
      status
      environment
      timestamp
      requestId
    }
  }
`;

export async function getApiStatus():
  Promise<ApiStatus> {
  const data =
    await graphqlRequest<
      GetApiStatusResponse
    >(
      GET_API_STATUS
    );

  return data.apiStatus;
}