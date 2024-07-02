export interface SearchResponse {
  path: string;
  title: string;
  content: string;
  publishedAt: number;
  updatedAt: number;
}

export interface SearchResponseWithCount {
  count: number;
  contents: Array<SearchResponse>;
}

export interface SearchSuccessResult {
  statusCode: number;
  hits: number;
  count: number;
  contents: Array<SearchResponse>;
  queryStrings: Array<string>;
}
