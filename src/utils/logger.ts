import pino from "pino";

interface LogMetadata {
  [key: string]: any;
}

class PinoLogger {
  private pinoLogger: pino.Logger;

  constructor() {
    this.pinoLogger = pino({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      formatters: {
        level: (label) => ({ level: label })
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      messageKey: "message"
    });
  }

  debug(metadata: LogMetadata) {
    this.pinoLogger.debug(metadata || {});
  }

  info(metadata: LogMetadata) {
    this.pinoLogger.info(metadata || {});
  }

  warn(metadata: LogMetadata) {
    this.pinoLogger.warn(metadata || {});
  }

  error(metadata: LogMetadata) {
    this.pinoLogger.error(metadata || {});
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

// Singleton instance
export const logger = new PinoLogger();
