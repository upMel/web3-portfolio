# Smart Contracts — Getting Started

## Tools

- **Hardhat** — compile, test, deploy Solidity contracts
- **OpenZeppelin** — secure, audited contract libraries
- **ethers.js** — interact with contracts in JS

## Folder Structure

```
contracts/
├── hardhat.config.js
├── package.json
├── contracts/
│   └── Portfolio.sol
├── scripts/
│   └── deploy.js
└── test/
    └── Portfolio.test.js
```

## Setup Commands

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

## Resources

- [Hardhat Docs](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Solidity Docs](https://docs.soliditylang.org)
