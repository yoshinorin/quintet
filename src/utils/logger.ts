import pino from "pino";

interface LogMetadata {
  [key: string]: any;
}

export type PostProcess = (
  level: string,
  message: string,
  metadata: Record<string, any>
) => void;
const noop: PostProcess = () => {};

export class PinoLogger {
  private pinoLogger: pino.Logger;
  private postProcess: PostProcess;

  constructor(postProcess: PostProcess = noop) {
    this.pinoLogger = pino({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      formatters: { level: (label) => ({ level: label }) },
      timestamp: pino.stdTimeFunctions.isoTime,
      messageKey: "message"
    });
    this.postProcess = postProcess;
  }

  debug(metadata: LogMetadata) {
    const meta = metadata || {};
    this.pinoLogger.debug(meta);
    this.postProcess("debug", meta.message, meta);
  }

  info(metadata: LogMetadata) {
    const meta = metadata || {};
    this.pinoLogger.info(meta);
    this.postProcess("info", meta.message, meta);
  }

  warn(metadata: LogMetadata) {
    const meta = metadata || {};
    this.pinoLogger.warn(meta);
    this.postProcess("warn", meta.message, meta);
  }

  error(metadata: LogMetadata) {
    const meta = metadata || {};
    this.pinoLogger.error(meta);
    this.postProcess("error", meta.message, meta);
  }

  httpResponse(
    message: string,
    method: string,
    url: string,
    statusCode: number,
    duration?: number,
    headers?: LogMetadata
  ) {
    const logData: any = {
      message: message,
      http: {
        method,
        url,
        status_code: statusCode,
        duration: `${duration} ms`,
        headers: headers
      }
    };

    if (statusCode >= 400) {
      this.error(logData);
    } else {
      this.info(logData);
    }
  }
}

let instance: PinoLogger | undefined;
export function makeInstance(postProcess?: PostProcess): PinoLogger {
  if (!instance) {
    instance = new PinoLogger(postProcess || noop);
  }
  return instance;
}
