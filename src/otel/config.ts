export interface OtelConfig {
  otelEndpoint: string;
  apiKey: string;
  serviceNamespace: string;
  serviceName: string;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return url.startsWith("http://") || url.startsWith("https://");
  } catch {
    return false;
  }
};

export const getOtelConfig = (): OtelConfig | null => {
  const otelEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  const apiKey = process.env.OTEL_EXPORTER_OTLP_HEADERS || "";
  const serviceNamespace = process.env.OTEL_SERVICE_NAMESPACE || "website";
  const serviceName = process.env.OTEL_SERVICE_NAME || "quintet";

  if (!isValidUrl(otelEndpoint)) {
    console.warn(`Invalid log endpoint format: ${otelEndpoint}`);
    return null;
  }

  return {
    otelEndpoint,
    apiKey,
    serviceNamespace,
    serviceName
  };
};
