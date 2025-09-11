import { getOtelConfig } from "./otel/config";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const otelConfig = getOtelConfig();

    // NOTE: Explicitly initialize the logger here.
    const { logger } = await import("./utils/logger");
    logger.info({ message: "logger initialized" });

    await import("./otel/lifecycle").then(({ initializeOtel }) =>
      initializeOtel(otelConfig)
    );
  }
}
