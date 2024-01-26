export interface Archive {
  path: string,
  title: string,
  publishedAt: number
}

export type ArchiveResponse = Archive

export interface ArchiveFormatedDate {
  path: string,
  title: string,
  yyyy: string,
  mm: string,
  dd: string
}
