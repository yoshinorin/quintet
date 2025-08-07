import { context, propagation } from "@opentelemetry/api";

export function injectPropagation(): Record<string, string> {
  const otelHeaders: Record<string, string> = {};
  propagation.inject(context.active(), otelHeaders);
  return otelHeaders;
}
