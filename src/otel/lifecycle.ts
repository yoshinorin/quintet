import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getOtelConfig } from "./config";

let isInitialized = false;

export function initializeOtel() {
  if (isInitialized) {
    return;
  }

  try {
    const config = getOtelConfig();

    if (!config) {
      console.log(
        "OpenTelemetry configuration not found, skipping initialization"
      );
      return;
    }

    process.env.OTEL_TRACES_EXPORTER = "otlp";
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT = config.otelEndpoint;
    process.env.OTEL_NODE_RESOURCE_DETECTORS = "env,host,os";
    process.env.OTEL_EXPORTER_OTLP_HEADERS = config.apiKey;
    process.env.OTEL_SERVICE_NAME = config.serviceName;
    process.env.OTEL_RESOURCE_ATTRIBUTES = `service.name=${config.serviceName},service.namespace=${config.serviceNamespace},service.version=${process.env.npm_package_version || "1.0.0"},deployment.environment=${process.env.NODE_ENV || "development"},service.instance.id=${process.env.HOSTNAME || process.env.COMPUTERNAME || "unknown"},host.name=${process.env.HOSTNAME || process.env.COMPUTERNAME || "localhost"}`;

    initializeNativeOtel(config);

    isInitialized = true;
    console.log(
      `OpenTelemetry initialized successfully (${config.serviceName})`
    );
  } catch (error) {
    console.error("Failed to initialize OpenTelemetry:", error);
    // NOTE: Do not throw to prevent the entire application from crashing due to telemetry failures
  }
}

let sdkInstance: NodeSDK | null = null;

function initializeNativeOtel(config: {
  otelEndpoint: string;
  apiKey: string;
}) {
  const headers = config.apiKey ? config.apiKey : {};
  const isProduction = process.env.NODE_ENV === "production";

  const exporterConfig = {
    headers,
    timeoutMillis: isProduction ? 10000 : 1000
  };

  const traceExporter = new OTLPTraceExporter({
    url: config.otelEndpoint,
    ...exporterConfig
  });

  const metricExporter = new OTLPMetricExporter({
    url: config.otelEndpoint,
    ...exporterConfig
  });

  const logExporter = new OTLPLogExporter({
    url: config.otelEndpoint,
    ...exporterConfig
  });

  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: isProduction ? 10000 : 5000
  });

  const logProcessor = new BatchLogRecordProcessor(logExporter, {
    maxExportBatchSize: isProduction ? 128 : 32,
    exportTimeoutMillis: isProduction ? 10000 : 5000
  });

  sdkInstance = new NodeSDK({
    traceExporter,
    metricReader,
    logRecordProcessor: logProcessor,
    instrumentations: [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-fs": {
          enabled: false
        },
        "@opentelemetry/instrumentation-http": {
          ignoreIncomingRequestHook: (req) => {
            const url = req.url || "";
            return (
              url.startsWith("/_next") ||
              url.startsWith("/api/status") ||
              url.includes("/__nextjs") ||
              url.includes("/favicon.svg") ||
              url.includes("/favicon.ico")
            );
          },
          /*
          ignoreOutgoingRequestHook: (options) => {
            const url = options.path || "";
            return url.includes("/_next") || url.includes("/__nextjs");
          },
          */
          requestHook: (span, req) => {
            const method = req.method || "GET";
            // @ts-ignore
            const url = "url" in req ? req.url || "/" : req.path || "/";
            span.updateName(`${method} ${url}`);
          }
        }
      })
    ]
  });

  sdkInstance.start();
}

export async function shutdownOtel(): Promise<void> {
  if (sdkInstance) {
    try {
      await sdkInstance.shutdown();
      console.log("OpenTelemetry SDK shutdown completed");
    } catch (error) {
      console.error("Error during OpenTelemetry shutdown:", error);
    }
  }
}

const handleShutdown = async (signal: string) => {
  console.log(`Received ${signal}, shutting down gracefully...`);
  try {
    await shutdownOtel();
    console.log("OpenTelemetry terminated successfully");
  } catch (error) {
    console.error("Error terminating OpenTelemetry:", error);
  } finally {
    process.exit(0);
  }
};

process.on("SIGTERM", () => handleShutdown("SIGTERM"));
process.on("SIGINT", () => handleShutdown("SIGINT"));
