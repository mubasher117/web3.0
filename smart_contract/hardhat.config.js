require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/EVG82nePEEbDcgDmn4YqXVAsYMWtSg5N',
      accounts: ['fec8cb13899fc2598a51f8b25f5c81c937f833bcdba12c3d7d18a1493bbf79bc']
    }
  }
};
