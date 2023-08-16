import { Insight } from "../models/insight";

export function asInsight(response: Response): Insight {
  const reqId = response.headers.get("x-request-id")
  const resTime = response.headers.get("x-response-time")

  return {
    backend: {
      requestId: reqId ? reqId : "N/A",
      apiResponseTime: resTime ? `${resTime} ms` : "N/A"
    },
    frontend: {
      runtime: process.env.QUINTET_RUNTIME,
      build: {
        commitHash: process.env.QUINTET_COMMIT_HASH
      }
    }
  } as Insight
}

