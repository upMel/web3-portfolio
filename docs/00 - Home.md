# 🌐 Web3 Portfolio — Knowledge Base

Welcome to your Web3 Portfolio project vault. Use this as your living documentation.

## Quick Links

- [[01 - Architecture/Overview|Architecture Overview]]
- [[01 - Architecture/Tech Stacks|Tech Stack Comparisons]]
- [[02 - Smart Contracts/Getting Started|Smart Contracts]]
- [[03 - Frontend/Setup|Frontend Setup]]
- [[04 - Backend/Setup|Backend Setup]]
- [[05 - Docker/Setup|Docker Setup]]
- [[06 - DevLog/Log|Dev Log]]
- [[07 - Git Workflow/Branching Strategy|Git Workflow & Branching]]

## Project Goals

- [ ] Build a Web3 portfolio dApp
- [ ] Deploy smart contracts to a testnet
- [ ] Connect frontend wallet (MetaMask)
- [ ] Dockerize dev environment
- [ ] Write clean documentation

## Tech Stack

| Layer | Technology |
|---|---|
| Smart Contracts | Solidity + Hardhat |
| Frontend | Next.js 14 + Tailwind + wagmi |
| Backend | Node.js + Express + ethers.js |
| Wallet | MetaMask / WalletConnect |
| Local Chain | Hardhat Network (Docker) |
| Database | PostgreSQL (optional, off-chain data) |
| Docs | Obsidian |
| DevOps | Docker + Docker Compose |

## Folder Structure

```
web3/
├── docs/           ← This Obsidian vault
├── contracts/      ← Solidity smart contracts (Hardhat)
├── frontend/       ← Next.js app
├── backend/        ← Express API server
├── docker/         ← Dockerfiles
└── scripts/        ← Deployment & utility scripts
```
