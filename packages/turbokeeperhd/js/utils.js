const Accounts = require("web3-eth-accounts");
const accounts = new Accounts();

const {
  TURBOKEEPER_PRIVATE_KEY,
  KOVAN_ALLOWED_RECIPIENTS,
  MAINNET_ALLOWED_RECIPIENTS,
} = require("./config");

const relayerAccount = {
  privateKey: TURBOKEEPER_PRIVATE_KEY,
  address: accounts.privateKeyToAccount(TURBOKEEPER_PRIVATE_KEY).address,
};

const hexStrRE = /^0x[0-9A-Fa-f]+$/;

const isHexStr = (s) => {
  return s.length % 2 == 0 && hexStrRE.test(s);
};

const isAddressStr = (s) => {
  return s.length == 42 && hexStrRE.test(s);
};

const isTxDataStr = (s) => {
  return s === "" || isHexStr(s);
};

const isNetworkStr = (s) => {
  return ["MAINNET", "KOVAN", "LOCAL"].includes(s);
};

module.exports = {
  isTxDataStr,
  isAddressStr,
  isNetworkStr,
  relayerAccount,
};
