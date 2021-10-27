import { LogLevelDesc } from "@hyperledger/cactus-common";
import { ICactusPluginOptions, IWebServiceEndpoint } from "@hyperledger/cactus-core-api";
import { PrometheusExporter } from "./prometheus-exporter/prometheus-exporter";
import { Express } from "express";
export interface IPluginKeychainMemoryOptions extends ICactusPluginOptions {
    logLevel?: LogLevelDesc;
    backend?: Map<string, string>;
    keychainId: string;
    prometheusExporter?: PrometheusExporter;
}
export declare class PluginKeychainMemory {
    readonly opts: IPluginKeychainMemoryOptions;
    static readonly CLASS_NAME = "PluginKeychainMemory";
    private readonly backend;
    private readonly log;
    private readonly instanceId;
    prometheusExporter: PrometheusExporter;
    get className(): string;
    constructor(opts: IPluginKeychainMemoryOptions);
    getOpenApiSpec(): unknown;
    getPrometheusExporter(): PrometheusExporter;
    getPrometheusExporterMetrics(): Promise<string>;
    getOrCreateWebServices(expressApp: Express): Promise<IWebServiceEndpoint[]>;
    getInstanceId(): string;
    getKeychainId(): string;
    getPackageName(): string;
    onPluginInit(): Promise<unknown>;
    get(key: string): Promise<string>;
    has(key: string): Promise<boolean>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
}
