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
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPluginFactory = exports.PluginFactoryKeychain = exports.PluginKeychainMemory = void 0;
__exportStar(require("./generated/openapi/typescript-axios/index"), exports);
var plugin_keychain_memory_1 = require("./plugin-keychain-memory");
Object.defineProperty(exports, "PluginKeychainMemory", {
  enumerable: true,
  get: function () {
    return plugin_keychain_memory_1.PluginKeychainMemory;
  },
});
var plugin_factory_keychain_1 = require("./plugin-factory-keychain");
Object.defineProperty(exports, "PluginFactoryKeychain", {
  enumerable: true,
  get: function () {
    return plugin_factory_keychain_1.PluginFactoryKeychain;
  },
});
const plugin_factory_keychain_2 = require("./plugin-factory-keychain");
async function createPluginFactory(pluginFactoryOptions) {
  return new plugin_factory_keychain_2.PluginFactoryKeychain(
    pluginFactoryOptions,
  );
}
exports.createPluginFactory = createPluginFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluL3R5cGVzY3JpcHQvcHVibGljLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsNkVBQTJEO0FBRzNELG1FQUdrQztBQUZoQyw4SEFBQSxvQkFBb0IsT0FBQTtBQUd0QixxRUFBa0U7QUFBekQsZ0lBQUEscUJBQXFCLE9BQUE7QUFFOUIsdUVBQWtFO0FBRTNELEtBQUssVUFBVSxtQkFBbUIsQ0FDdkMsb0JBQTJDO0lBRTNDLE9BQU8sSUFBSSwrQ0FBcUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFKRCxrREFJQyJ9
