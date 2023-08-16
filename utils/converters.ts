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
      runtime: {
        type: process.env.QUINTET_RUNTIME,
        version: process.env.QUINTET_RUNTIME_VERSION
      },
      product: {
        name: process.env.QUINTET_PRODUCT_NAME,
        version: process.env.QUINTET_VERSION,
        repo: process.env.QUINTET_REPO,
        build: {
          commit: process.env.QUINTET_COMMIT_HASH,
          url: process.env.QUINTET_COMMIT_URL,
          at: process.env.QUINTET_BUILD_AT
        }
      },

    }
  } as Insight
}

