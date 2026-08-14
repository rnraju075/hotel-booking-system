import { env } from "../../config/env.js";

export interface ApiStatusResult {
  service: string;
  status: string;
  environment: string;
  timestamp: string;
  requestId: string;
}

export class SystemService {
  getApiStatus(
    requestId: string
  ): ApiStatusResult {
    return {
      service: "hotel-booking-api",
      status: "ok",
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      requestId
    };
  }
}