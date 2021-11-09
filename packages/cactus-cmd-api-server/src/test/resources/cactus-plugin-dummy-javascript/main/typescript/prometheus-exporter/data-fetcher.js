"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectMetrics = void 0;
const metrics_1 = require("./metrics");
async function collectMetrics(keyCount) {
  metrics_1.totalKeyCount
    .labels(`${metrics_1.K_CACTUS_KEYCHAIN_MEMORY_TOTAL_KEY_COUNT}`)
    .set(keyCount.counter);
}
exports.collectMetrics = collectMetrics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1mZXRjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL21haW4vdHlwZXNjcmlwdC9wcm9tZXRoZXVzLWV4cG9ydGVyL2RhdGEtZmV0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSx1Q0FHbUI7QUFFWixLQUFLLFVBQVUsY0FBYyxDQUFDLFFBQWtCO0lBQ3JELHVCQUFhO1NBQ1YsTUFBTSxDQUFDLEdBQUcsa0RBQXdDLEVBQUUsQ0FBQztTQUNyRCxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFKRCx3Q0FJQyJ9
