import { notFound } from "next/navigation";

export async function runOrHandleErrorIf(fn: (arg: any) => React.FunctionComponent): Promise<any> {
  try {
    return fn;
  } catch(e) {
    // @ts-ignore
    if (e.cause === 404) {
      return notFound();
    }
    // FIXME: I don't want to re-throw
    // @ts-ignore
    throw new Error(response.statusText, { cause: response.status });
  }
}

export function throwIfError(response: Response) {
  if (response.status !== 200) {
    // TODO: use custom Error class
    throw new Error(response.statusText, { cause: response.status });
  }
}