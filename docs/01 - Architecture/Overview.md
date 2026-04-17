# Architecture Overview

## High-Level Diagram

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                     │
│           Next.js Frontend + wagmi/viem             │
│              (connects via MetaMask)                │
└───────────────────┬─────────────────┬───────────────┘
                    │                 │
          RPC calls │                 │ REST API calls
                    ▼                 ▼
┌───────────────────────┐   ┌─────────────────────────┐
│  Hardhat / Testnet    │   │   Express Backend        │
│  Smart Contracts      │   │   (off-chain indexing,   │
│  (Solidity)           │   │    portfolio metadata)   │
└───────────────────────┘   └──────────┬──────────────┘
                                       │
                                       ▼
                            ┌─────────────────────┐
                            │   PostgreSQL DB      │
                            │   (optional)         │
                            └─────────────────────┘
```

## Key Concepts

- **On-chain**: Smart contracts store ownership, NFTs, tokens — immutable and trustless.
- **Off-chain**: Backend handles things that don't need to be on-chain — caching, metadata, analytics.
- **wagmi/viem**: React hooks that make reading from and writing to the blockchain easy.
- **Hardhat**: Local Ethereum development environment (compile, test, deploy contracts).

## Network Flow

1. User opens the dApp in browser
2. wagmi detects and connects to MetaMask
3. Frontend reads on-chain data via RPC (contract reads)
4. Frontend calls backend for off-chain enriched data
5. User can sign transactions (MetaMask popup → sent to chain)
