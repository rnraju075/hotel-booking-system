import axios from "axios";

interface GraphQLErrorItem {
  message: string;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: GraphQLErrorItem[];
}

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not configured"
  );
}

export const apiClient =
  axios.create({
    baseURL: apiBaseUrl,

    headers: {
      "Content-Type": "application/json"
    },

    timeout: 10_000
  });

export async function graphqlRequest<
  TData,
  TVariables = undefined
>(
  query: string,
  variables?: TVariables
): Promise<TData> {
  const body = {
    query,
    ...(variables !== undefined
      ? { variables }
      : {})
  };

  const response =
    await apiClient.post<
      GraphQLResponse<TData>
    >(
      "/graphql",
      body
    );

  if (
    response.data.errors &&
    response.data.errors.length > 0
  ) {
    const message =
      response.data.errors
        .map((error) => error.message)
        .join(", ");

    throw new Error(message);
  }

  if (!response.data.data) {
    throw new Error(
      "GraphQL response did not contain data"
    );
  }

  return response.data.data;
}