const pact = require("@pact-foundation/pact-node");
const { commit } = require("./utils");

const checkProvider = {
  pactBroker: "http://pact-broker.casumo.cloud/",
  participant: "frontend-react-stack",
  participantVersion: commit,
  retryWhileUnknown: 5,
  retryInterval: 10,
};

pact.canDeploy(checkProvider).catch(err => {
  console.error("Verification failed!", err);

  return process.exit(1);
});
