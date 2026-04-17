# Web3 Portfolio

A full-stack Web3 portfolio dApp — on-chain project registry with a Next.js frontend, Express backend, and Dockerized local development environment.

## Stack

| Layer | Tech |
|---|---|
| Smart Contracts | Solidity 0.8.24 + Hardhat |
| Frontend | Next.js 14 + Tailwind + wagmi/viem |
| Backend | Node.js + Express + ethers.js |
| Local Chain | Hardhat Network |
| Database | PostgreSQL (optional, off-chain data) |
| DevOps | Docker + Docker Compose |
| Docs | Obsidian (see `docs/`) |

## Prerequisites

- [Node.js 20+](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MetaMask](https://metamask.io) browser extension
- [Obsidian](https://obsidian.md) (open `docs/` as a vault)

## Quick Start

### 1. Clone & configure environment

```bash
cp .env.example .env
# Fill in any values if needed
```

### 2. Start the full stack with Docker

```bash
docker compose up --build
```

This starts:
- Hardhat local chain → `http://localhost:8545`
- Express backend → `http://localhost:4000`
- Next.js frontend → `http://localhost:3000`
- PostgreSQL → `localhost:5432`

### 3. Deploy the smart contract (in a separate terminal)

```bash
cd contracts
npm install
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address into your `.env` as `CONTRACT_ADDRESS=`.

### 4. Run without Docker (manual)

```bash
# Terminal 1 — Local blockchain
cd contracts && npm install && npx hardhat node

# Terminal 2 — Deploy contract
cd contracts && npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 — Backend
cd backend && npm install && npm run dev

# Terminal 4 — Frontend
cd frontend && npm install && npm run dev
```

## Project Structure

```
web3/
├── docs/               ← Obsidian knowledge base
├── contracts/          ← Solidity + Hardhat
│   ├── contracts/
│   │   └── Portfolio.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── Portfolio.test.js
│   └── hardhat.config.js
├── backend/            ← Express API
│   └── src/
│       ├── index.js
│       ├── routes/
│       └── services/
├── frontend/           ← Next.js app (create with npx create-next-app)
├── docker/             ← Dockerfiles
├── docker-compose.yml
├── .env.example
└── .gitignore
```

## Smart Contract Tests

```bash
cd contracts
npm install
npx hardhat test
```

## Documentation

Open the `docs/` folder in Obsidian as a vault. Start at `00 - Home.md`.
