import { context, trace } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import type { PostProcess } from "../utils/logger";

const levelMap: Record<string, SeverityNumber> = {
  debug: SeverityNumber.DEBUG,
  info: SeverityNumber.INFO,
  warn: SeverityNumber.WARN,
  error: SeverityNumber.ERROR
};

export function toSeverityNumber(
  level: string | undefined | null
): SeverityNumber {
  if (!level) {
    return SeverityNumber.UNSPECIFIED;
  }
  const key = level.toLowerCase().trim();
  return levelMap[key] ?? SeverityNumber.UNSPECIFIED;
}

export function isKnownLevel(level: string): boolean {
  return levelMap[level.toLowerCase()] !== undefined;
}

export const emit: PostProcess = (
  level: string,
  message: string,
  metadata: Record<string, any>
) => {
  try {
    const severity = toSeverityNumber(level);
    const span = trace.getSpan(context.active());
    const attrs: Record<string, any> = { ...metadata };
    if (span) {
      const spanContext = span.spanContext();
      attrs.trace_id = spanContext.traceId;
      attrs.span_id = spanContext.spanId;
    }
    const logger = logs.getLogger("quintet-logger");
    logger.emit({
      body:
        metadata && Object.keys(metadata).length > 0
          ? { ...metadata, message }
          : message,
      severityNumber: severity,
      severityText: SeverityNumber[severity],
      attributes: attrs
    });
  } catch {
    // Nothing todo
  }
};
