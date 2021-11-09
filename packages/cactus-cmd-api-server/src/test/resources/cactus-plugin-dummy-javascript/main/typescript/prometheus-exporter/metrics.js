"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalKeyCount = exports.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT = void 0;
const prom_client_1 = require("prom-client");
exports.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT =
  "cactus_keychain_memory_total_key_count";
exports.totalKeyCount = new prom_client_1.Gauge({
  registers: [],
  name: exports.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT,
  help: "Total keys present in memory",
  labelNames: ["type"],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0cmljcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tYWluL3R5cGVzY3JpcHQvcHJvbWV0aGV1cy1leHBvcnRlci9tZXRyaWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFvQztBQUV2QixRQUFBLHdDQUF3QyxHQUNuRCx3Q0FBd0MsQ0FBQztBQUU5QixRQUFBLGFBQWEsR0FBRyxJQUFJLG1CQUFLLENBQUM7SUFDckMsU0FBUyxFQUFFLEVBQUU7SUFDYixJQUFJLEVBQUUsZ0RBQXdDO0lBQzlDLElBQUksRUFBRSw4QkFBOEI7SUFDcEMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO0NBQ3JCLENBQUMsQ0FBQyJ9
