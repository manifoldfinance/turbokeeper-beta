require("dotenv").config();

const envVars = [
  "PORT",
  "KOVAN_RPC_URL",
  "MAINNET_RPC_URL",
  "LOCAL_RPC_URL",
  "TURBOKEEPER_PRIVATE_KEY",
  "TURBOKEEPER_FEE", // default fee (in Wei) broadcast by this relayer
  "TURBOKEEPER_MIN_TX_PROFIT", // minimum profit per tx (in Wei) to consider submitting it. should be notably higher
  // than TURBOKEEPER_FEE
];

const arrayEnvVars = ["KOVAN_ALLOWED_RECIPIENTS", "MAINNET_ALLOWED_RECIPIENTS"];

let e = {};
for (const envVar of envVars) {
  e[envVar] = process.env[envVar];
}

for (const arrayEnvVar of arrayEnvVars) {
  if (process.env[arrayEnvVar] === "") {
    e[arrayEnvVar] = [];
  } else {
    e[arrayEnvVar] = process.env[arrayEnvVar].split(" ");
  }
}

module.exports = e;
