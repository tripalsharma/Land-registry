module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1337", // match with Ganache CLI
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",
    },
  },
};
