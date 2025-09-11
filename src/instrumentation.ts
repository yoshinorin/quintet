export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // NOTE: Explicitly initialize the logger here.
    const { logger } = await import("./utils/logger");
    logger.info({ message: "logger initialized" });

    await import("./otel/lifecycle").then(({ initializeOtel }) =>
      initializeOtel()
    );
  }
}
