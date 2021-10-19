FROM ghcr.io/hyperledger/cactus-cmd-api-server:v0.10.0

ENV NODE_ENV=production
ARG NPM_PKG_VERSION=latest

RUN npm install -g yarn@1.18.0

RUN yarn add @hyperledger/cactus-plugin-ledger-connector-quorum@${NPM_PKG_VERSION} --production --ignore-engines
