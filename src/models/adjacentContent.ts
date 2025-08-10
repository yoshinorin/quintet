export interface AdjacentContent {
  previous?: {
    id: string;
    title: string;
    path: string;
  };
  next?: {
    id: string;
    title: string;
    path: string;
  };
}
