require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Update the port based on your local blockchain
    },
  },
};
