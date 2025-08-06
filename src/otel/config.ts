export interface OtelConfig {
  traceEndpoint: string;
  metricEndpoint: string;
  logEndpoint: string;
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
  const traceEndpoint = process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT;
  const metricEndpoint = process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT;
  const logEndpoint = process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT;
  const otelEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  const apiKey = process.env.OTEL_EXPORTER_OTLP_HEADERS || "";
  const serviceNamespace = process.env.OTEL_SERVICE_NAMESPACE || "website";
  const serviceName = process.env.OTEL_SERVICE_NAME || "quintet";

  if (traceEndpoint && metricEndpoint && logEndpoint) {
    if (!isValidUrl(traceEndpoint)) {
      console.warn(`Invalid trace endpoint format: ${traceEndpoint}`);
      return null;
    }
    if (!isValidUrl(metricEndpoint)) {
      console.warn(`Invalid metric endpoint format: ${metricEndpoint}`);
    }
    if (!isValidUrl(logEndpoint)) {
      console.warn(`Invalid log endpoint format: ${logEndpoint}`);
    }
    if (!isValidUrl(otelEndpoint)) {
      console.warn(`Invalid log endpoint format: ${otelEndpoint}`);
    }

    return {
      traceEndpoint,
      metricEndpoint,
      logEndpoint,
      otelEndpoint,
      apiKey,
      serviceNamespace,
      serviceName
    };
  }
  return null;
};
