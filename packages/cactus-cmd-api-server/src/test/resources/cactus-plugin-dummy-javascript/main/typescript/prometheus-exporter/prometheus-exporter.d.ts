import { Registry } from "prom-client";
import { KeyCount } from "./response.type";
export interface IPrometheusExporterOptions {
    pollingIntervalInMin?: number;
}
export declare class PrometheusExporter {
    readonly prometheusExporterOptions: IPrometheusExporterOptions;
    readonly metricsPollingIntervalInMin: number;
    readonly keyCount: KeyCount;
    readonly registry: Registry;
    constructor(prometheusExporterOptions: IPrometheusExporterOptions);
    setTotalKeyCounter(keyCount: number): void;
    getPrometheusMetrics(): Promise<string>;
    startMetricsCollection(): void;
}
