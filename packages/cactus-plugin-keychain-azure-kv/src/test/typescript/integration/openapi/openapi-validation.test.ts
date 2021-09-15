import test, { Test } from "tape-promise/tape";
import http from "http";
import type { AddressInfo } from "net";
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

import {
  LogLevelDesc,
  IListenOptions,
  Servers,
} from "@hyperledger/cactus-common";

import {
  Configuration,
  DefaultApi as KeychainAzureKvApi,
  GetKeychainEntryRequest,
  SetKeychainEntryRequest,
} from "../../../../main/typescript/public-api";

import {
  IPluginKeychainAzureKvOptions,
  PluginKeychainAzureKv,
} from "../../../../main/typescript/public-api";

import { SecretClientMock } from "../../mock/plugin-keychain-azure-kv-mock";

import { installOpenapiValidationMiddleware } from "@hyperledger/cactus-core";
import OAS from "../../../../main/json/openapi.json";

const logLevel: LogLevelDesc = "TRACE";
const testCase = "Test cactus-plugin-keychain-azure-kv openapi validation";

test(testCase, async (t: Test) => {
  const options: IPluginKeychainAzureKvOptions = {
    instanceId: uuidv4(),
    keychainId: uuidv4(),
    logLevel: logLevel,
    azureEndpoint: "testEndpoint",
    backend: new SecretClientMock({
      azureKvUrl: "testUrl",
      logLevel: logLevel,
    }),
  };
  const plugin = new PluginKeychainAzureKv(options);

  const expressApp = express();
  expressApp.use(bodyParser.json({ limit: "250mb" }));
  const server = http.createServer(expressApp);
  const listenOptions: IListenOptions = {
    hostname: "0.0.0.0",
    port: 0,
    server,
  };
  const addressInfo = (await Servers.listen(listenOptions)) as AddressInfo;
  test.onFinish(async () => await Servers.shutdown(server));
  const { address, port } = addressInfo;
  const apiHost = `http://${address}:${port}`;

  const configuration = new Configuration({ basePath: apiHost });
  const apiClient = new KeychainAzureKvApi(configuration);

  await installOpenapiValidationMiddleware({
    logLevel,
    app: expressApp,
    apiSpec: OAS,
  });

  await plugin.getOrCreateWebServices();
  await plugin.registerWebServices(expressApp);

  const key1 = uuidv4();
  const value1 = uuidv4();

  const fSet = "setKeychainEntryV1";
  const fGet = "getKeychainEntryV1";
  const cOk = "without bad request error";
  const cWithoutParams = "not sending all required parameters";
  const cInvalidParams = "sending invalid parameters";

  test(`${testCase} - ${fSet} - ${cOk}`, async (t2: Test) => {
    const res = await apiClient.setKeychainEntryV1({
      key: key1,
      value: value1,
    });
    t2.equal(res.status, 200, `Endpoint ${fSet}: response.status === 200 OK`);
    t2.end();
  });

  test(`${testCase} - ${fGet} - ${cOk}`, async (t2: Test) => {
    const res = await apiClient.getKeychainEntryV1({ key: key1 });
    t2.equal(res.status, 200, `Endpoint ${fGet}: response.status === 200 OK`);
    t2.end();
  });

  test(`${testCase} - ${fSet} - ${cWithoutParams}`, async (t2: Test) => {
    try {
      await apiClient.setKeychainEntryV1(({
        value: value1,
      } as any) as SetKeychainEntryRequest);
    } catch (e) {
      t2.equal(
        e.response.status,
        400,
        `Endpoint ${fSet} without required key: response.status === 400 OK`,
      );
      const fields = e.response.data.map((param: any) =>
        param.path.replace(".body.", ""),
      );
      t2.ok(fields.includes("key"), "Rejected because key is required");
    }
    t2.end();
  });

  test(`${testCase} - ${fGet} - ${cWithoutParams}`, async (t2: Test) => {
    try {
      await apiClient.getKeychainEntryV1(
        ({} as any) as GetKeychainEntryRequest,
      );
    } catch (e) {
      t2.equal(
        e.response.status,
        400,
        `Endpoint ${fGet} without required key: response.status === 400 OK`,
      );
      const fields = e.response.data.map((param: any) =>
        param.path.replace(".body.", ""),
      );
      t2.ok(fields.includes("key"), "Rejected because key is required");
    }
    t2.end();
  });

  test(`${testCase} - ${fSet} - ${cInvalidParams}`, async (t2: Test) => {
    try {
      await apiClient.setKeychainEntryV1(({
        key: key1,
        value: value1,
        fake: 4,
      } as any) as SetKeychainEntryRequest);
    } catch (e) {
      t2.equal(
        e.response.status,
        400,
        `Endpoint ${fSet} with fake=4: response.status === 400 OK`,
      );
      const fields = e.response.data.map((param: any) =>
        param.path.replace(".body.", ""),
      );
      t2.ok(
        fields.includes("fake"),
        "Rejected because fake is not a valid parameter",
      );
    }
    t2.end();
  });

  test(`${testCase} - ${fGet} - ${cInvalidParams}`, async (t2: Test) => {
    try {
      await apiClient.getKeychainEntryV1(({
        key: key1,
        fake: 4,
      } as any) as GetKeychainEntryRequest);
    } catch (e) {
      t2.equal(
        e.response.status,
        400,
        `Endpoint ${fGet} with fake=4: response.status === 400 OK`,
      );
      const fields = e.response.data.map((param: any) =>
        param.path.replace(".body.", ""),
      );
      t2.ok(
        fields.includes("fake"),
        "Rejected because fake is not a valid parameter",
      );
    }
    t2.end();
  });

  t.end();
});
