import { publicApi } from '../../../../config';

export default async function GET() {
  return fetch(`${publicApi.url}/system/metadata`)
}
