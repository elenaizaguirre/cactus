import { Express, Request, Response } from "express";
import { LogLevelDesc, IAsyncProvider } from "@hyperledger/cactus-common";
import { IWebServiceEndpoint, IExpressRequestHandler, IEndpointAuthzOptions } from "@hyperledger/cactus-core-api/";
import OAS from "../../json/openapi.json";
import { PluginKeychainMemory } from "../plugin-keychain-memory";
export interface IGetPrometheusExporterMetricsEndpointV1Options {
    logLevel?: LogLevelDesc;
    plugin: PluginKeychainMemory;
}
export declare class GetPrometheusExporterMetricsEndpointV1 implements IWebServiceEndpoint {
    readonly opts: IGetPrometheusExporterMetricsEndpointV1Options;
    private readonly log;
    constructor(opts: IGetPrometheusExporterMetricsEndpointV1Options);
    getAuthorizationOptionsProvider(): IAsyncProvider<IEndpointAuthzOptions>;
    getExpressRequestHandler(): IExpressRequestHandler;
    get oasPath(): typeof OAS.paths["/api/v1/plugins/@hyperledger/cactus-plugin-keychain-memory/get-prometheus-exporter-metrics"];
    getPath(): string;
    getVerbLowerCase(): string;
    getOperationId(): string;
    registerExpress(expressApp: Express): Promise<IWebServiceEndpoint>;
    handleRequest(req: Request, res: Response): Promise<void>;
}
