import { BackendMeta } from "../models/backendMeta";
import { Insight } from "../models/insight";

export function asInsight(response: Response): Insight {
  const reqId = response.headers.get("x-request-id")
  const resTime = response.headers.get("x-response-time")

  return {
    backend: {
      response: {
        id: reqId ? reqId : "N/A",
        time: resTime ? `${resTime} ms` : "N/A"
      },
      runtime: {
        type: "N/A",
        vendor: "N/A",
        version: "N/A",
      },
      product: {
        name: "N/A",
        version: "N/A",
        repo: "N/A",
        build: {
          commit: "N/A",
          url: "N/A",
          scalaVersion: "N/A",
          sbtVersion: "N/A"
        }
      }
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

export function appendBackendMeta(currentInsight: Insight, backendMetaResponse: BackendMeta): Insight {
  return Object.assign(
    currentInsight,
    {
      backend: {
        response: {
          id: currentInsight.backend.response.id,
          time: currentInsight.backend.response.time
        },
        runtime: {
          type: backendMetaResponse.runtime.name,
          vendor: backendMetaResponse.runtime.vendor,
          version: backendMetaResponse.runtime.version,
        },
        product: {
          name: backendMetaResponse.name,
          version: backendMetaResponse.version,
          repo: backendMetaResponse.repository,
          build: {
            commit: backendMetaResponse.build.commit,
            url: backendMetaResponse.build.url,
            scalaVersion: backendMetaResponse.build.scalaVersion,
            sbtVersion: backendMetaResponse.build.sbtVersion
          }
        }
      }
    }
  )
}

