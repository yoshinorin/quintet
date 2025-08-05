import { fetchStatus } from "../../../api";

/**
 * Health check endpoint that proxies requests directly to the backend API
 * Forwards all headers as-is and returns backend response unchanged
 */
export async function GET(request: Request) {
  return await fetchStatus(request.headers);
}
