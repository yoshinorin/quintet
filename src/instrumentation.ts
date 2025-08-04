export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./otel/lifecycle").then(({ initializeOtel }) =>
      initializeOtel()
    );
  }
}
