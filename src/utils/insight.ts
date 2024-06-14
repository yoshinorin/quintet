import { BackendMeta, Insight } from "../models/models";

export function asInsight(response: Response): Insight {
  const reqId = response.headers.get("x-request-id");
  const resTime = response.headers.get("x-response-time");

  return {
    backend: {
      response: {
        id: reqId ? reqId : "N/A",
        time: resTime ? `${resTime} ms` : "N/A"
      },
      runtime: {
        type: "N/A",
        vendor: "N/A",
        version: "N/A"
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
      }
    }
  } as Insight;
}

export function mergeBackendMeta(
  current: Insight,
  backendMeta: BackendMeta
): Insight {
  return Object.assign(current, {
    backend: {
      response: {
        id: current.backend.response.id,
        time: current.backend.response.time
      },
      runtime: {
        type: backendMeta.runtime.name,
        vendor: backendMeta.runtime.vendor,
        version: backendMeta.runtime.version
      },
      product: {
        name: backendMeta.name,
        version: backendMeta.version,
        repo: backendMeta.repository,
        build: {
          commit: backendMeta.build.commit,
          url: backendMeta.build.url,
          scalaVersion: backendMeta.build.scalaVersion,
          sbtVersion: backendMeta.build.sbtVersion
        }
      }
    }
  });
}
