import { getOtelConfig } from "./otel/config";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const otelConfig = getOtelConfig();
    await import("./otel/lifecycle").then(({ initializeOtel }) =>
      initializeOtel(otelConfig)
    );
  }
}
