import { viewOnGithub } from '../config';

export async function getCommit(perPage: number = 5): Promise<Response> {
  return fetch(
    `${viewOnGithub.apiUrl}?per_page=${perPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
