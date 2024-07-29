"use server";

import { headers } from "next/headers";
import { fetchStatus } from "../../api";
import { Renderer } from "./renderer";

export default async function Page(req: any) {
  const { props } = await handler(req);
  return <Renderer {...props} />;
}

async function handler(req: any) {
  const response: Response = await fetchStatus(headers());
  return {
    props: {
      statusCode: response.status
    }
  };
}
