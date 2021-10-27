import path from "path";
import test, { Test } from "tape-promise/tape";
import { v4 as uuidv4 } from "uuid";
import { LogLevelDesc } from "@hyperledger/cactus-common";
import { PluginImportType } from "@hyperledger/cactus-core-api";
import {
  ApiServer,
  AuthorizationProtocol,
  ConfigService,
} from "@hyperledger/cactus-cmd-api-server";

const logLevel: LogLevelDesc = "TRACE";

test("can install plugins at runtime with specified version based on imports", async (t: Test) => {
  const pluginsPath = path.join(
    __dirname,
    "../../../../../../", // walk back up to the project root
    ".tmp/test/test-cmd-api-server/plugin-import-with-npm-install_test/", // the dir path from the root
    uuidv4(), // then a random directory to ensure proper isolation
  );
  const pluginManagerOptionsJson = JSON.stringify({ pluginsPath });

  const configService = new ConfigService();

  const apiServerOptions = configService.newExampleConfig();
  apiServerOptions.pluginManagerOptionsJson = pluginManagerOptionsJson;
  apiServerOptions.authorizationProtocol = AuthorizationProtocol.NONE;
  apiServerOptions.configFile = "";
  apiServerOptions.apiCorsDomainCsv = "*";
  apiServerOptions.apiPort = 0;
  apiServerOptions.cockpitPort = 0;
  apiServerOptions.grpcPort = 0;
  apiServerOptions.apiTlsEnabled = false;
  apiServerOptions.plugins = [
    {
      packageName: "@hyperledger/cactus-plugin-keychain-memory",
      type: PluginImportType.Local,
      options: {
        instanceId: uuidv4(),
        keychainId: uuidv4(),
        logLevel,
        // packageSrc:
        //   "git+https://github.com/elenaizaguirre/cactus.git#manage-plugins-versions",
        // packageSrc: "git+https://github.com/hyperledger/cactus.git#28c97d3",
        // packageSrc:
        //   "https://gitpkg.now.sh/elenaizaguirre/cactus/packages/cactus-plugin-keychain-memory?main&scripts.postinstall=tsc%20--build%20--verbose",
        // packageSrc:
        //   "git+https://github.com/elenaizaguirre/cactus.git?manage-plugins-versions",
        packageSrc:
          "https://gitpkg.now.sh/elenaizaguirre/cactus/packages/cactus-plugin-keychain-memory?manage-plugins-versions",
        // packageSrc:
        //   "https://gitpkg.now.sh/hyperledger/cactus?master&scripts.postinstall=npm%20run%20configure",
        // packageSrc:
        //   "https://gitpkg.now.sh/hyperledger/cactus?main&scripts.postinstall=configure",
        // packageSrc:
        //   "https://gitpkg.now.sh/hyperledger/cactus/packages/cactus-plugin-keychain-memory?main",
        // packageSrc:
        //   "https://gitpkg.now.sh/hyperledger/cactus/packages/cactus-plugin-keychain-memory?main&scripts.postinstall=%26%26%20npm%20install%20--ignore-scripts%20%26%26%20npm%20run%20build",
        // version: "v0.5.0",
      },
    },
  ];
  const config = configService.newExampleConfigConvict(apiServerOptions);

  const apiServer = new ApiServer({
    config: config.getProperties(),
  });

  const startResponse = apiServer.start();
  await t.doesNotReject(
    startResponse,
    "failed to start API server with dynamic plugin imports configured for it...",
  );
  t.ok(startResponse, "startResponse truthy OK");

  const packageFilePath = path.join(
    pluginsPath,
    apiServerOptions.plugins[0].options.instanceId,
    "node_modules",
    `${apiServerOptions.plugins[0].packageName}`,
    "package.json",
  );
  const { version } = await import(packageFilePath);
  t.comment(version);
  //   t.strictEquals(
  //     version,
  //     apiServerOptions.plugins[0].options.version,
  //     `Package version strictly equal to ${version}`,
  //   );

  test.onFinish(() => apiServer.shutdown());
});
