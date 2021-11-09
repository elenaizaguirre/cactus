"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPrometheusExporterMetricsEndpointV1 = void 0;
const cactus_common_1 = require("@hyperledger/cactus-common");
const openapi_json_1 = __importDefault(require("../../json/openapi.json"));
const cactus_core_1 = require("@hyperledger/cactus-core");
class GetPrometheusExporterMetricsEndpointV1 {
  constructor(opts) {
    this.opts = opts;
    const fnTag = "GetPrometheusExporterMetricsEndpointV1#constructor()";
    cactus_common_1.Checks.truthy(opts, `${fnTag} options`);
    cactus_common_1.Checks.truthy(opts.plugin, `${fnTag} options.plugin`);
    this.log = cactus_common_1.LoggerProvider.getOrCreate({
      label: "get-prometheus-exporter-metrics-v1",
      level: opts.logLevel || "INFO",
    });
  }
  getAuthorizationOptionsProvider() {
    // TODO: make this an injectable dependency in the constructor
    return {
      get: async () => ({
        isProtected: true,
        requiredRoles: [],
      }),
    };
  }
  getExpressRequestHandler() {
    return this.handleRequest.bind(this);
  }
  get oasPath() {
    return openapi_json_1.default.paths[
      "/api/v1/plugins/@hyperledger/cactus-plugin-keychain-memory/get-prometheus-exporter-metrics"
    ];
  }
  getPath() {
    return this.oasPath.get["x-hyperledger-cactus"].http.path;
  }
  getVerbLowerCase() {
    return this.oasPath.get["x-hyperledger-cactus"].http.verbLowerCase;
  }
  getOperationId() {
    return this.oasPath.get.operationId;
  }
  async registerExpress(expressApp) {
    await cactus_core_1.registerWebServiceEndpoint(expressApp, this);
    return this;
  }
  async handleRequest(req, res) {
    const fnTag = "GetPrometheusExporterMetrics#handleRequest()";
    const verbUpper = this.getVerbLowerCase().toUpperCase();
    this.log.debug(`${verbUpper} ${this.getPath()}`);
    try {
      const resBody = await this.opts.plugin.getPrometheusExporterMetrics();
      res.status(200);
      res.send(resBody);
    } catch (ex) {
      this.log.error(`${fnTag} failed to serve request`, ex);
      res.status(500);
      res.statusMessage = ex.message;
      res.json({ error: ex.stack });
    }
  }
}
exports.GetPrometheusExporterMetricsEndpointV1 = GetPrometheusExporterMetricsEndpointV1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXByb21ldGhldXMtZXhwb3J0ZXItbWV0cmljcy1lbmRwb2ludC12MS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3R5cGVzY3JpcHQvZ2V0LXByb21ldGhldXMtZXhwb3J0ZXItbWV0cmljcy9nZXQtcHJvbWV0aGV1cy1leHBvcnRlci1tZXRyaWNzLWVuZHBvaW50LXYxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLDhEQU1vQztBQVFwQywyRUFBMEM7QUFFMUMsMERBQXNFO0FBU3RFLE1BQWEsc0NBQXNDO0lBSWpELFlBQ2tCLElBQW9EO1FBQXBELFNBQUksR0FBSixJQUFJLENBQWdEO1FBRXBFLE1BQU0sS0FBSyxHQUFHLHNEQUFzRCxDQUFDO1FBRXJFLHNCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUM7UUFDeEMsc0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssaUJBQWlCLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsR0FBRyxHQUFHLDhCQUFjLENBQUMsV0FBVyxDQUFDO1lBQ3BDLEtBQUssRUFBRSxvQ0FBb0M7WUFDM0MsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTTtTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQStCO1FBQzdCLDhEQUE4RDtRQUM5RCxPQUFPO1lBQ0wsR0FBRyxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDaEIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLGFBQWEsRUFBRSxFQUFFO2FBQ2xCLENBQUM7U0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVNLHdCQUF3QjtRQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxzQkFBRyxDQUFDLEtBQUssQ0FDZCw0RkFBNEYsQ0FDN0YsQ0FBQztJQUNKLENBQUM7SUFFTSxPQUFPO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDNUQsQ0FBQztJQUVNLGdCQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNyRSxDQUFDO0lBRU0sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUN0QyxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FDMUIsVUFBbUI7UUFFbkIsTUFBTSx3Q0FBMEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUM3QyxNQUFNLEtBQUssR0FBRyw4Q0FBOEMsQ0FBQztRQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpELElBQUk7WUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDRCQUE0QixFQUFFLENBQUM7WUFDdEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25CO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssMEJBQTBCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7Q0FDRjtBQXpFRCx3RkF5RUMifQ==
