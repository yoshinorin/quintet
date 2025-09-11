import { isValid as isValidUrl } from "../utils/url";

export interface OtelConfig {
  otelEndpoint: string;
  apiKey: string;
  serviceNamespace: string;
  serviceName: string;
}

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
