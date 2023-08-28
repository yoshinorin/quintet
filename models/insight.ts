export interface Insight {
  backend: {
    response: {
      id: string,
      time: string
    },
    runtime: {
      type: string,
      vendor: string,
      version: string,
    },
    product: {
      name: string,
      version: string,
      repo: string,
      build: {
        commit: string,
        url: string,
        scalaVersion: string
        sbtVersion: string
      }
    }
  },
  frontend: {
    runtime: {
      type: string,
      version: string,
    },
    product: {
      name: string,
      version: string,
      repo: string,
      build: {
        commit: string,
        url: string,
        at: string
      }
    }
  },
}
