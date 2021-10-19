# `@hyperledger/cactus-plugin-ledger-connector-quorum`

This plugin provides `Cactus` a way to interact with Quorum networks. Using this we can perform:
* Deploy Smart-contracts through bytecode.
* Build and sign transactions using different keystores.
* Invoke smart-contract functions that we have deployed on the network.

## Summary

  - [Getting Started](#getting-started)
  - [Usage](#usage)
  - [Prometheus Exporter](#prometheus-exporter)
  - [Runing the tests](#running-the-tests)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Getting Started

Clone the git repository on your local machine. Follow these instructions that will get you a copy of the project up and running on
your local machine for development and testing purposes.

### Prerequisites

In the root of the project to install the dependencies execute the command:
```sh
npm run comfigure
```

### Compiling

In the projects root folder, run this command to compile the plugin and create the dist directory:
```sh
npm run tsc
```

## Usage

To use this import public-api and create new **PluginLedgerConnectorQuorum**.
```typescript
  const connector: PluginLedgerConnectorQuorum = new PluginLedgerConnectorQuorum({
    instanceId: uuidV4(),
    rpcApiHttpHost,
    pluginRegistry: new PluginRegistry(),
  });
```
You can make calls through the connector to the plugin API:

```typescript
async invokeContract(req: InvokeContractV1Request):Promise<InvokeContractV1Response>;
async transactSigned(rawTransaction: string): Promise<RunTransactionResponse>;
async transactPrivateKey(req: RunTransactionRequest): Promise<RunTransactionResponse>;
async transactCactusKeychainRef(req: RunTransactionRequest):Promise<RunTransactionResponse>;
async deployContract(req: DeployContractSolidityBytecodeV1Request):Promise<RunTransactionResponse>;
async signTransaction(req: SignTransactionRequest):Promise<Optional<SignTransactionResponse>>;
```

Call example to deploy a contract:
```typescript
const deployOut = await connector.deployContract({
  web3SigningCredential: {
    ethAccount: firstHighNetWorthAccount,
    secret: "",
    type: Web3SigningCredentialType.GETHKEYCHAINPASSWORD,
  },
  bytecode: ContractJson.bytecode,
  gas: 1000000,
});
```
The field "type" can have the following values:
```typescript
enum Web3SigningCredentialType {
    CACTUSKEYCHAINREF = 'CACTUS_KEYCHAIN_REF',
    GETHKEYCHAINPASSWORD = 'GETH_KEYCHAIN_PASSWORD',
    PRIVATEKEYHEX = 'PRIVATE_KEY_HEX',
    NONE = 'NONE'
}
```
> Extensive documentation and examples in the [readthedocs](https://readthedocs.org/projects/hyperledger-cactus/) (WIP)

## Running the tests

To check that all has been installed correctly and the plugin has no errors, there are two options to run the tests:

* Run this command at the project's root:
```sh
npm run test:plugin-ledger-connector-quorum
```
* Use containers
### Building/running the container image locally

All you need to run containers is in `packages/cactus-plugin-ledger-connector-quorum/containerization/`. The containerization of this plugin is based on Docker Compose. The `docker-compose.yml` file includes four services.
1. Service *quorum-aio* generates a container with the same name that uses cactus-quorum-all-in-one image for the ledger.
2. Service *cmd-api-server-quorum-env* generates the *cmd-api-server-quorum* container when **env** profile is active.
3. Service *cmd-api-server-quorum-cli* generates the *cmd-api-server-quorum* container when **cli** profile is active.
4. Service *cmd-api-server-quorum-file* generates the *cmd-api-server-quorum* container when **file** profile is active.

To run the containers use this command line from folder `packages/cactus-plugin-ledger-connector-quorum/containerization/`:

```sh
docker-compose --profile env up --build -d
```

To stop them use:
```sh
docker-compose --profile env down
```

The above instruction will generate two containers, *quorum-aio* and *cmd-api-server-quorum* with plugins as environment variable. You can choose the way to send the plugins by setting the profile flag to:
- **env**: Launch container with plugin configuration as a environment variable.
- **cli**: Launch container with plugin configuration as a CLI argument.
- **file**: Launch container with configuration file mounted from host machine.

#### Configuration

File *.env* contains the environment variables used by Docker Compose. Some of these variables are shared for all profiles, like NPM_PKG_VERSION, which determines the plugin version to be installed. You can also modify the plugin to be installed when *env* or *cli* profiles are used, and file name used with *file* profile too.

#### Testing API calls with the container


**Terminal Window 1 (Ledger & Cactus API Server)**

Run the containers with Docker Compose as above:
```sh
docker-compose --profile env up --build -d
```

**Terminal Window 2 (curl - replace eth accounts as needed)**
```sh
curl --location --request POST 'http://127.0.0.1:4000/api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-quorum/run-transaction' \
--header 'Content-Type: application/json' \
--data-raw '{
    "web3SigningCredential": {
      "ethAccount": "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
      "secret": "",
      "type": "GETH_KEYCHAIN_PASSWORD"
    },
    "transactionConfig": {
      "from": "0xed9d02e382b34818e88b88a309c7fe71e65f419d",
      "to": "0x0638e1574728b6d862dd5d3a3e0942c3be47d996",
      "value": 1,
      "gas": 10000000
    }
}'
```

The above should produce a response that looks similar to this:

```json
{
    "success": true,
    "data": {
        "transactionReceipt": {
            "blockHash": "0x7a7c88d1cd75abf67aba5a70ee41cddd1f360b1bf8d5bdc0caaafe7448821efa",
            "blockNumber": 1218,
            "contractAddress": null,
            "cumulativeGasUsed": 21000,
            "from": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
            "gasUsed": 21000,
            "logs": [],
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "status": true,
            "to": "0x0638e1574728b6d862dd5d3a3e0942c3be47d996",
            "transactionHash": "0xbde79840ed3ee861312f2f5df3aba158ac531455c63fe8cab7770be736634aba",
            "transactionIndex": 0
        }
    }
}
```

## Prometheus Exporter

This class creates a prometheus exporter, which scrapes the transactions (total transaction count) for the use cases incorporating the use of Quorum connector plugin.

### Prometheus Exporter Usage
The prometheus exporter object is initialized in the `PluginLedgerConnectorQuorum` class constructor itself, so instantiating the object of the `PluginLedgerConnectorQuorum` class, gives access to the exporter object.
You can also initialize the prometheus exporter object seperately and then pass it to the `IPluginLedgerConnectorQuorumOptions` interface for `PluginLedgerConnectoQuorum` constructor.

`getPrometheusMetricsV1` function returns the prometheus exporter metrics, currently displaying the total transaction count, which currently increments everytime the `transact()` method of the `PluginLedgerConnectorQuorum` class is called.

### Prometheus Integration
To use Prometheus with this exporter make sure to install [Prometheus main component](https://prometheus.io/download/).
Once Prometheus is setup, the corresponding scrape_config needs to be added to the prometheus.yml

```(yaml)
- job_name: 'quorum_ledger_connector_exporter'
  metrics_path: api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-quorum/get-prometheus-exporter-metrics
  scrape_interval: 5s
  static_configs:
    - targets: ['{host}:{port}']
```

Here the `host:port` is where the prometheus exporter metrics are exposed. The test cases (For example, packages/cactus-plugin-ledger-connector-quorum/src/test/typescript/integration/plugin-ledger-connector-quorum/deploy-contract/deploy-contract-from-json.test.ts) exposes it over `0.0.0.0` and a random port(). The random port can be found in the running logs of the test case and looks like (42379 in the below mentioned URL)
`Metrics URL: http://0.0.0.0:42379/api/v1/plugins/@hyperledger/cactus-plugin-ledger-connector-quorum/get-prometheus-exporter-metrics`

Once edited, you can start the prometheus service by referencing the above edited prometheus.yml file.
On the prometheus graphical interface (defaulted to http://localhost:9090), choose **Graph** from the menu bar, then select the **Console** tab. From the **Insert metric at cursor** drop down, select **cactus_quorum_total_tx_count** and click **execute**

### Helper code

###### response.type.ts
This file contains the various responses of the metrics.

###### data-fetcher.ts
This file contains functions encasing the logic to process the data points

###### metrics.ts
This file lists all the prometheus metrics and what they are used for.

## Running the tests

To check that all has been installed correctly and that the pugin has no errors, there are two options to run the tests:

* Run this command at the project's root:
```sh
npm run test:plugin-ledger-connector-quorum
```

## Contributing

We welcome contributions to Hyperledger Cactus in many forms, and there’s always plenty to do!

Please review [CONTIRBUTING.md](../../CONTRIBUTING.md) to get started.

## License

This distribution is published under the Apache License Version 2.0 found in the [LICENSE](../../LICENSE) file.

## Acknowledgments 
```