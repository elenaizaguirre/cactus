"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginKeychainMemory = void 0;
const cactus_common_1 = require("@hyperledger/cactus-common");
const openapi_json_1 = __importDefault(require("../json/openapi.json"));
const prometheus_exporter_1 = require("./prometheus-exporter/prometheus-exporter");
const get_prometheus_exporter_metrics_endpoint_v1_1 = require("./get-prometheus-exporter-metrics/get-prometheus-exporter-metrics-endpoint-v1");
class PluginKeychainMemory {
  constructor(opts) {
    this.opts = opts;
    const fnTag = `${this.className}#constructor()`;
    cactus_common_1.Checks.truthy(opts, `${fnTag} arg options`);
    cactus_common_1.Checks.truthy(
      opts.keychainId,
      `${fnTag} arg options.keychainId`,
    );
    cactus_common_1.Checks.truthy(
      opts.instanceId,
      `${fnTag} options.instanceId`,
    );
    cactus_common_1.Checks.nonBlankString(
      opts.keychainId,
      `${fnTag} options.keychainId`,
    );
    this.backend = opts.backend || new Map();
    cactus_common_1.Checks.truthy(this.backend, `${fnTag} arg options.backend`);
    const level = this.opts.logLevel || "INFO";
    const label = this.className;
    this.log = cactus_common_1.LoggerProvider.getOrCreate({ level, label });
    this.instanceId = this.opts.instanceId;
    this.prometheusExporter =
      opts.prometheusExporter ||
      new prometheus_exporter_1.PrometheusExporter({ pollingIntervalInMin: 1 });
    cactus_common_1.Checks.truthy(
      this.prometheusExporter,
      `${fnTag} options.prometheusExporter`,
    );
    this.prometheusExporter.startMetricsCollection();
    this.log.info(`Created ${this.className}. KeychainID=${opts.keychainId}`);
    this.log.warn(
      `Never use ${this.className} in production. ` +
        `It does not support encryption. It stores everything in plain text.`,
    );
  }
  get className() {
    return PluginKeychainMemory.CLASS_NAME;
  }
  getOpenApiSpec() {
    return openapi_json_1.default;
  }
  getPrometheusExporter() {
    return this.prometheusExporter;
  }
  async getPrometheusExporterMetrics() {
    const res = await this.prometheusExporter.getPrometheusMetrics();
    this.log.debug(`getPrometheusExporterMetrics() response: %o`, res);
    return res;
  }
  async getOrCreateWebServices(expressApp) {
    const { log } = this;
    log.info(`Installing web services for plugin ${this.getPackageName()}...`);
    const endpoints = [];
    {
      const opts = {
        plugin: this,
        logLevel: this.opts.logLevel,
      };
      const endpoint = new get_prometheus_exporter_metrics_endpoint_v1_1.GetPrometheusExporterMetricsEndpointV1(
        opts,
      );
      endpoint.registerExpress(expressApp);
      endpoints.push(endpoint);
    }
    const pkg = this.getPackageName();
    log.info(`Installed web services for plugin ${pkg} OK`, { endpoints });
    return endpoints;
  }
  getInstanceId() {
    return this.instanceId;
  }
  getKeychainId() {
    return this.opts.keychainId;
  }
  getPackageName() {
    return `@hyperledger/cactus-plugin-keychain-memory`;
  }
  async onPluginInit() {
    return;
  }
  async get(key) {
    const value = this.backend.get(key);
    if (value) {
      return value;
    } else {
      throw new Error(`Keychain entry for "${key}" not found.`);
    }
  }
  async has(key) {
    return this.backend.has(key);
  }
  async set(key, value) {
    this.backend.set(key, value);
    this.prometheusExporter.setTotalKeyCounter(this.backend.size);
  }
  async delete(key) {
    this.backend.delete(key);
    this.prometheusExporter.setTotalKeyCounter(this.backend.size);
  }
}
exports.PluginKeychainMemory = PluginKeychainMemory;
PluginKeychainMemory.CLASS_NAME = "PluginKeychainMemory";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWtleWNoYWluLW1lbW9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL3R5cGVzY3JpcHQvcGx1Z2luLWtleWNoYWluLW1lbW9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFLb0M7QUFNcEMsd0VBQXVDO0FBRXZDLG1GQUErRTtBQUcvRSwrSUFHdUY7QUFTdkYsTUFBYSxvQkFBb0I7SUFZL0IsWUFBNEIsSUFBa0M7UUFBbEMsU0FBSSxHQUFKLElBQUksQ0FBOEI7UUFDNUQsTUFBTSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxnQkFBZ0IsQ0FBQztRQUNoRCxzQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLHNCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxLQUFLLHlCQUF5QixDQUFDLENBQUM7UUFDbEUsc0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEtBQUsscUJBQXFCLENBQUMsQ0FBQztRQUM5RCxzQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsS0FBSyxxQkFBcUIsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3pDLHNCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFLLHNCQUFzQixDQUFDLENBQUM7UUFFNUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyw4QkFBYyxDQUFDLFdBQVcs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
