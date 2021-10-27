"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape-promise/tape"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cactus_common_1 = require("@hyperledger/cactus-common");
const uuid_1 = require("uuid");
const typescript_1 = require("../../../main/typescript");
const metrics_1 = require("../../../main/typescript/prometheus-exporter/metrics");
const public_api_1 = require("../../../main/typescript/public-api");
const cactus_core_api_1 = require("@hyperledger/cactus-core-api");
tape_1.default("PluginKeychainMemory", (t1) => {
    t1.doesNotThrow(() => new typescript_1.PluginKeychainMemory({ instanceId: "a", keychainId: "a" }));
    tape_1.default("Validates constructor arg instanceId", (t) => {
        t.throws(() => new typescript_1.PluginKeychainMemory({
            instanceId: null,
            keychainId: "valid-value",
        }));
        t.throws(() => new typescript_1.PluginKeychainMemory({
            instanceId: "",
            keychainId: "valid-value",
        }));
        t.end();
    });
    tape_1.default("Validates constructor arg keychainId", (t) => {
        t.throws(() => new typescript_1.PluginKeychainMemory({
            instanceId: "valid-value",
            keychainId: null,
        }));
        t.throws(() => new typescript_1.PluginKeychainMemory({
            instanceId: "valid-value",
            keychainId: "",
        }));
        t.end();
    });
    tape_1.default("get,set,has,delete alters state as expected", async (t) => {
        const options = {
            instanceId: uuid_1.v4(),
            keychainId: uuid_1.v4(),
        };
        const plugin = new typescript_1.PluginKeychainMemory(options);
        const expressApp = express_1.default();
        expressApp.use(body_parser_1.default.json({ limit: "250mb" }));
        const server = http_1.default.createServer(expressApp);
        const listenOptions = {
            hostname: "0.0.0.0",
            port: 0,
            server,
        };
        const addressInfo = (await cactus_common_1.Servers.listen(listenOptions));
        tape_1.default.onFinish(async () => await cactus_common_1.Servers.shutdown(server));
        const { address, port } = addressInfo;
        const apiHost = `http://${address}:${port}`;
        t.comment(`Metrics URL: ${apiHost}/api/v1/plugins/@hyperledger/cactus-plugin-keychain-memory/get-prometheus-exporter-metrics`);
        const config = new cactus_core_api_1.Configuration({ basePath: apiHost });
        const apiClient = new public_api_1.DefaultApi(config);
        await plugin.getOrCreateWebServices(expressApp);
        t.equal(plugin.getKeychainId(), options.keychainId, "Keychain ID set OK");
        t.equal(plugin.getInstanceId(), options.instanceId, "Instance ID set OK");
        const key1 = uuid_1.v4();
        const value1 = uuid_1.v4();
        const hasPrior = await plugin.has(key1);
        t.false(hasPrior, "hasPrior === false OK");
        await plugin.set(key1, value1);
        const hasAfter1 = await plugin.has(key1);
        t.true(hasAfter1, "hasAfter === true OK");
        const valueAfter1 = await plugin.get(key1);
        t.ok(valueAfter1, "valueAfter truthy OK");
        t.equal(valueAfter1, value1, "valueAfter === value OK");
        await plugin.delete(key1);
        const hasAfterDelete1 = await plugin.has(key1);
        t.false(hasAfterDelete1, "hasAfterDelete === false OK");
        await t.rejects(plugin.get(key1), key1);
        {
            const res = await apiClient.getPrometheusMetricsV1();
            const promMetricsOutput = "# HELP " +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                " Total keys present in memory\n" +
                "# TYPE " +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                " gauge\n" +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                '{type="' +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                '"} 0';
            t.ok(res);
            t.ok(res.data);
            t.equal(res.status, 200);
            t.true(res.data.includes(promMetricsOutput), "Total Key Count 0 recorded as expected. RESULT OK");
        }
        const key2 = uuid_1.v4();
        const value2 = uuid_1.v4();
        await plugin.set(key2, value2);
        const hasAfter = await plugin.has(key2);
        t.true(hasAfter, "hasAfter === true OK");
        const valueAfter2 = await plugin.get(key2);
        t.ok(valueAfter2, "valueAfter truthy OK");
        t.equal(valueAfter2, value2, "valueAfter === value OK");
        {
            const res = await apiClient.getPrometheusMetricsV1();
            const promMetricsOutput = "# HELP " +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                " Total keys present in memory\n" +
                "# TYPE " +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                " gauge\n" +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                '{type="' +
                metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT +
                '"} 1';
            t.ok(res);
            t.ok(res.data);
            t.equal(res.status, 200);
            t.true(res.data.includes(promMetricsOutput), "Total Key Count 1 recorded as expected. RESULT OK");
        }
        t.end();
    });
    t1.end();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWtleWNoYWluLW1lbW9yeS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Rlc3QvdHlwZXNjcmlwdC91bml0L3BsdWdpbi1rZXljaGFpbi1tZW1vcnkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUErQztBQUUvQyxzREFBOEI7QUFDOUIsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUd4Qiw4REFBcUU7QUFFckUsK0JBQW9DO0FBQ3BDLHlEQUdrQztBQUVsQyxrRkFBZ0g7QUFFaEgsb0VBQXNGO0FBQ3RGLGtFQUE2RDtBQUU3RCxjQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxFQUFRLEVBQUUsRUFBRTtJQUN4QyxFQUFFLENBQUMsWUFBWSxDQUNiLEdBQUcsRUFBRSxDQUFDLElBQUksaUNBQW9CLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUNyRSxDQUFDO0lBRUYsY0FBSSxDQUFDLHNDQUFzQyxFQUFFLENBQUMsQ0FBTyxFQUFFLEVBQUU7UUFDdkQsQ0FBQyxDQUFDLE1BQU0sQ0FDTixHQUFHLEVBQUUsQ0FDSCxJQUFJLGlDQUFvQixDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxJQUFXO1lBQ3ZCLFVBQVUsRUFBRSxhQUFhO1NBQzFCLENBQUMsQ0FDTCxDQUFDO1FBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FDTixHQUFHLEVBQUUsQ0FDSCxJQUFJLGlDQUFvQixDQUFDO1lBQ3ZCLFVBQVUsRUFBRSxFQUFFO1lBQ2QsVUFBVSxFQUFFLGFBQWE7U0FDMUIsQ0FBQyxDQUNMLENBQUM7UUFDRixDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDVixDQUFDLENBQUMsQ0FBQztJQUVILGNBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDLENBQU8sRUFBRSxFQUFFO1FBQ3ZELENBQUMsQ0FBQyxNQUFNLENBQ04sR0FBRyxFQUFFLENB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