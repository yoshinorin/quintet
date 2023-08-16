export interface Insight {
  backend: {
    requestId: string,
    apiResponseTime: string
  }
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
