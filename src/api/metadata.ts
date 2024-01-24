import { url } from '../../config';

export default async function GET() {
  return fetch(`${url}/system/metadata`, {
    method: 'GET'
  });
}
