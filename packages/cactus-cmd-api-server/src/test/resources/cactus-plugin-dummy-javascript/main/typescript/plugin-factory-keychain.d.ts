import { IPluginFactoryOptions } from "@hyperledger/cactus-core-api";
import { PluginFactory } from "@hyperledger/cactus-core-api";
import { IPluginKeychainMemoryOptions, PluginKeychainMemory } from "./plugin-keychain-memory";
export declare class PluginFactoryKeychain extends PluginFactory<PluginKeychainMemory, IPluginKeychainMemoryOptions, IPluginFactoryOptions> {
    create(pluginOptions?: IPluginKeychainMemoryOptions): Promise<PluginKeychainMemory>;
}
