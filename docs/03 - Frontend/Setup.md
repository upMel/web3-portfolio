# Frontend — Setup

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (styling)
- **wagmi v2** (React hooks for Ethereum)
- **viem** (low-level Ethereum interactions)
- **RainbowKit** (wallet connection UI)
- **Socket.io client** — subscribes to real-time contract events from backend
- **GraphQL / urql or apollo-client** — queries The Graph subgraph for indexed event history
- **Vitest + Testing Library** — unit tests for hooks and components
- **Playwright** — E2E browser tests

## Setup Commands

```bash
cd frontend
npm install
npm run dev

# Run unit tests
npm run test

# Run E2E tests
npx playwright test
```

## Key Pages

| Route | Description |
|---|---|
| `/` | Portfolio homepage — lists all active projects from The Graph |
| `/admin` | Owner-only: add project (with image upload), remove projects |

## Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|---|---|
| `useProjects()` | Reads all active projects from contract |
| `useContractOwner()` | Reads `owner()` from contract |
| `useIsOwner()` | Compares connected wallet to owner |
| `useAddProject()` | Writes `addProject()`, tracks pending/confirming/success |
| `useRemoveProject()` | Writes `removeProject(id)`, same lifecycle |

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Deployed `Portfolio.sol` address |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect project ID |
| `NEXT_PUBLIC_CHAIN_ID` | Target chain ID (31337 local, 11155111 Sepolia) |

## Resources

- [wagmi Docs](https://wagmi.sh)
- [viem Docs](https://viem.sh)
- [RainbowKit Docs](https://www.rainbowkit.com/docs)
- [The Graph Docs](https://thegraph.com/docs)
- [Vitest Docs](https://vitest.dev)
- [Playwright Docs](https://playwright.dev)
