"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusExporter = void 0;
const prom_client_1 = __importStar(require("prom-client"));
const data_fetcher_1 = require("./data-fetcher");
const metrics_1 = require("./metrics");
const metrics_2 = require("./metrics");
class PrometheusExporter {
  constructor(prometheusExporterOptions) {
    this.prometheusExporterOptions = prometheusExporterOptions;
    this.keyCount = { counter: 0 };
    this.metricsPollingIntervalInMin =
      prometheusExporterOptions.pollingIntervalInMin || 1;
    this.registry = new prom_client_1.Registry();
  }
  setTotalKeyCounter(keyCount) {
    this.keyCount.counter = keyCount;
    data_fetcher_1.collectMetrics(this.keyCount);
  }
  async getPrometheusMetrics() {
    const result = await this.registry.getSingleMetricAsString(
      metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT,
    );
    return result;
  }
  startMetricsCollection() {
    this.registry.registerMetric(metrics_2.totalKeyCount);
    prom_client_1.default.collectDefaultMetrics({ register: this.registry });
  }
}
exports.PrometheusExporter = PrometheusExporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWV0aGV1cy1leHBvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3R5cGVzY3JpcHQvcHJvbWV0aGV1cy1leHBvcnRlci9wcm9tZXRoZXVzLWV4cG9ydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBbUQ7QUFFbkQsaURBQWdEO0FBQ2hELHVDQUFxRTtBQUNyRSx1Q0FBMEM7QUFNMUMsTUFBYSxrQkFBa0I7SUFLN0IsWUFDa0IseUJBQXFEO1FBQXJELDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBNEI7UUFKdkQsYUFBUSxHQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBTWxELElBQUksQ0FBQywyQkFBMkI7WUFDOUIseUJBQXlCLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxzQkFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVNLGtCQUFrQixDQUFDLFFBQWdCO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztRQUNqQyw2QkFBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sS0FBSyxDQUFDLG9CQUFvQjtRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQ3hELGtEQUF3QyxDQUN6QyxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVNLHNCQUFzQjtRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBYSxDQUFDLENBQUM7UUFDNUMscUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0Y7QUE3QkQsZ0RBNkJDIn0=
