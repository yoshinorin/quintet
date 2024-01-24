import { api } from '../../config';

export default async function GET() {
  return fetch(`${api.url}/system/metadata`, {
    method: 'GET'
  });
}
