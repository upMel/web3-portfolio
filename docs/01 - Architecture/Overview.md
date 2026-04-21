# Architecture Overview

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                           │
│              Next.js Frontend + wagmi/viem                     │
│           (connects via MetaMask / RainbowKit)                 │
└───────┬──────────────────┬─────────────────┬───────────────────┘
        │                  │                 │
RPC /   │    GraphQL        │  REST + WS      │  IPFS gateway
The     │    (The Graph)    │  (Express)      │  (images)
Graph   │                  │                 │
        ▼                  ▼                 ▼
┌──────────────┐  ┌─────────────────────────────────────────────┐
│  Hardhat /   │  │           Express Backend                   │
│  Testnet     │  │  ┌──────────────┐   ┌────────────────────┐  │
│  Sepolia     │  │  │  Prisma ORM  │   │  Redis pub/sub     │  │
│  (Solidity)  │  │  │  PostgreSQL  │   │  Socket.io events  │  │
└──────┬───────┘  │  └──────────────┘   └────────────────────┘  │
       │          └─────────────────────────────────────────────┘
       │ events
       ▼
┌─────────────────────┐    ┌────────────────────────┐
│   The Graph Node    │    │   IPFS / Pinata         │
│   (subgraph)        │    │   (project images)      │
│   GraphQL endpoint  │    │   content-addressed CID │
└─────────────────────┘    └────────────────────────┘
```

## Key Concepts

- **On-chain**: Smart contracts store project ownership and metadata — immutable and trustless.
- **Off-chain**: Backend handles caching, off-chain metadata, and image uploads; PostgreSQL persists it.
- **wagmi/viem**: React hooks that make reading from and writing to the blockchain easy.
- **Hardhat**: Local Ethereum development environment (compile, test, deploy contracts).
- **Foundry**: Solidity-native fuzz and invariant testing, runs alongside Hardhat.
- **The Graph**: Indexes on-chain events (`ProjectAdded`, `ProjectRemoved`) into a queryable GraphQL API — replaces raw `eth_getLogs` polling.
- **Redis**: Pub/sub broker — backend publishes contract events, Socket.io relays them to browser clients in real time.
- **IPFS + Pinata**: Decentralised file storage for project images; CID stored on-chain ensures tamper-proof references.

## Network Flow

1. User opens the dApp in browser
2. wagmi detects and connects to MetaMask via RainbowKit
3. Frontend reads project list via The Graph GraphQL API (indexed from on-chain events)
4. Frontend subscribes to WebSocket (Socket.io) for live updates when projects are added/removed
5. User can sign transactions (MetaMask popup → sent to chain)
6. Admin uploads project image → backend pins to IPFS via Pinata → stores CID
7. Backend persists off-chain metadata (description drafts, tags, etc.) in PostgreSQL via Prisma

## Testing Strategy

| Layer | Tool | Type |
|---|---|---|
| Smart contracts | Hardhat + Mocha | Unit tests (JS) |
| Smart contracts | Foundry | Fuzz + invariant tests (Solidity) |
| Frontend hooks | Vitest + Testing Library | Unit tests |
| Frontend UI | Playwright | E2E tests |
