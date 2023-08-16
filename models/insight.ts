export interface Insight {
  backend: {
    requestId: string,
    apiResponseTime: string
  }
  frontend: {
    runtime: string
  },
}
