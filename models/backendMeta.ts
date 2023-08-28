export interface BackendMeta {
  name: string,
  version: string,
  repository: string,
  runtime: {
    name: string,
    vendor: string,
    version: string
  },
  build: {
    commit: string,
    url: string,
    scalaVersion: string,
    sbtVersion: string
  }
}
