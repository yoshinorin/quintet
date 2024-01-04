export interface InjectScript {
  key: string,
  async: boolean,
  src: string,
  code: {
    type: string,
    onLoad: boolean,
    code: string
  }
}
