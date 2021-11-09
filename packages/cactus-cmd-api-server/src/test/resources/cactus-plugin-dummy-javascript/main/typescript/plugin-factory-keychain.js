"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginFactoryKeychain = void 0;
const uuid_1 = require("uuid");
const cactus_core_api_1 = require("@hyperledger/cactus-core-api");
const plugin_keychain_memory_1 = require("./plugin-keychain-memory");
class PluginFactoryKeychain extends cactus_core_api_1.PluginFactory {
  async create(
    pluginOptions = {
      backend: new Map(),
      instanceId: uuid_1.v4(),
      keychainId: uuid_1.v4(),
      logLevel: "TRACE",
    },
  ) {
    return new plugin_keychain_memory_1.PluginKeychainMemory(pluginOptions);
  }
}
exports.PluginFactoryKeychain = PluginFactoryKeychain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLWZhY3Rvcnkta2V5Y2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWFpbi90eXBlc2NyaXB0L3BsdWdpbi1mYWN0b3J5LWtleWNoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUFvQztBQUdwQyxrRUFBNkQ7QUFFN0QscUVBR2tDO0FBRWxDLE1BQWEscUJBQXNCLFNBQVEsK0JBSTFDO0lBQ0MsS0FBSyxDQUFDLE1BQU0sQ0FDVixnQkFBOEM7UUFDNUMsT0FBTyxFQUFFLElBQUksR0FBRyxFQUFFO1FBQ2xCLFVBQVUsRUFBRSxTQUFNLEVBQUU7UUFDcEIsVUFBVSxFQUFFLFNBQU0sRUFBRTtRQUNwQixRQUFRLEVBQUUsT0FBTztLQUNsQjtRQUVELE9BQU8sSUFBSSw2Q0FBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7QUFmRCxzREFlQyJ9
