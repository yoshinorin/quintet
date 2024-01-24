import { publicApi } from '../../config';

export async function getSystemMetadata() {
  return fetch(`${publicApi.url}/system/metadata`, {
    method: 'GET',
    cache: 'no-cache',
  });
}
