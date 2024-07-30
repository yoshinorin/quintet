// https://datatracker.ietf.org/doc/html/rfc7807
export interface ProblemDetails {
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors: [code: string, message: string];
}

export function isProblemDetails(value: unknown): value is ProblemDetails {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { status, errors } = value as Record<keyof ProblemDetails, unknown>;
  if (typeof status !== "number") {
    return false;
  }

  if (Array.isArray(errors)) {
    return true;
  }

  return false;
}
