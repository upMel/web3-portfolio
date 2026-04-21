# Tech Stack Comparisons

A reference for every major technology choice in this project — what we picked, what we could have used instead, and why.

---

## Frontend Framework — Next.js vs React vs Others

### The Contenders

| | React | **Next.js** ✅ | Vite + React | Nuxt (Vue) |
|---|---|---|---|---|
| Type | UI library | Full framework | Build tool + React | Full framework (Vue) |
| Routing | Manual (React Router) | File-based, automatic | Manual | File-based |
| SSR / SSG | ❌ Not built-in | ✅ SSR, SSG, ISR, RSC | ❌ | ✅ |
| SEO | Poor (blank HTML to crawlers) | Excellent | Poor | Excellent |
| API Routes | ❌ Need separate server | ✅ Built-in | ❌ | ✅ |
| Image Optimization | ❌ | ✅ `<Image>` | ❌ | ✅ |
| TypeScript | Manual setup | ✅ Built-in | ✅ Built-in | ✅ Built-in |
| Learning curve | Low | Medium | Low | Medium |
| Web3 ecosystem fit | ✅ | ✅✅ | ✅ | ⚠️ Smaller community |
| Used in production Web3 | Uniswap, early dApps | Aave, OpenSea, ENS, most modern dApps | Some SPAs | Rare |

### Why NOT plain React?
- Renders empty HTML — Google indexes a blank page
- No routing out of the box
- No server-side data fetching — everything loads client-side (bad UX: spinning loaders)
- You end up rebuilding what Next.js already gives you

### Why NOT Vite + React?
- Great for pure SPAs (dashboards, internal tools) where SEO doesn't matter
- No SSR — same SEO problem as plain React
- Fine choice if your dApp is wallet-gated (nobody lands on it via Google)

### Why Next.js ✅
- **Server Components** — fetch contract data on the server; page renders with content already populated
- **File-based routing** — `/app/portfolio/page.tsx` just works
- **wagmi is designed around it** — all official examples use Next.js
- **SEO** — your portfolio needs to be Googleable

---

## Web3 Wallet / Blockchain Library — wagmi vs web3.js vs ethers.js vs viem

### The Contenders

| | web3.js | ethers.js v6 | **viem** ✅ | **wagmi v2** ✅ |
|---|---|---|---|---|
| Type | Full library | Full library | Low-level library | React hooks layer |
| Age / Origin | 2015, original | 2018, popular successor | 2023, modern | 2022, built on viem |
| TypeScript | Weak | Good | Excellent, fully typed | Excellent |
| Bundle size | Large (~500kb) | Medium (~120kb) | Small (~35kb) | Small (wraps viem) |
| Tree-shakable | ❌ | ⚠️ Partial | ✅ | ✅ |
| React integration | Manual | Manual | Manual | ✅ Native hooks |
| Wallet connection UI | Manual | Manual | Manual | ✅ Built-in |
| Multi-wallet support | Manual | Manual | Manual | ✅ |
| ABIv2 type safety | ❌ | ⚠️ | ✅ Full (ABI → TypeScript) | ✅ |
| Active development | ⚠️ Slow | ✅ | ✅✅ Very active | ✅✅ |
| Maintained by | ChainSafe | Richard Moore | Paradigm | Paradigm |

### web3.js — The Original
- Created in 2015, was *the* standard for years
- Fell behind in modern JavaScript patterns (callbacks over promises)
- Large bundle size, weak TypeScript support
- Still used in older projects / tutorials — you'll see it in Stack Overflow answers
- **Avoid for new projects** — it's being superseded

### ethers.js v6 — The Reliable Middle Ground
- Became the community standard ~2019–2022
- Much smaller and cleaner than web3.js
- Great for **backend use** (no React, no browser) — we use it in our Express backend
- Doesn't have React hooks — you'd write all the wallet state management yourself
- Still excellent, just not the best choice for a React frontend anymore

### viem — The Modern Core
- Built by Paradigm (same team as wagmi)
- Fully TypeScript-native — if your ABI says a function returns `uint256`, viem types it as `bigint` automatically
- Tiny bundle, tree-shakable
- **No React** — pure JS/TS, works anywhere
- Powers wagmi under the hood

### wagmi v2 — The React Layer ✅
- Wraps viem and adds React hooks
- `useReadContract`, `useWriteContract`, `useAccount`, `useConnect` — handles all the boilerplate
- Manages wallet state, chain switching, transaction status, reconnection — all for you
- Works with MetaMask, WalletConnect, Coinbase Wallet, etc. out of the box
- **RainbowKit** plugs on top for a polished wallet connection UI

---

## Smart Contract Framework — Hardhat vs Foundry vs Truffle

| | Truffle | **Hardhat** ✅ | Foundry |
|---|---|---|---|
| Language | JavaScript | JavaScript / TypeScript | Rust-powered, tests in Solidity |
| Test language | JS / Mocha | JS / Mocha / Chai | Solidity |
| Speed | Slow | Medium | Very fast |
| Plugin ecosystem | Medium | Large | Growing |
| Active development | ⚠️ Deprecated | ✅✅ | ✅✅ |
| Learning curve | Low | Low | Medium |
| JS stack integration | ✅ | ✅✅ | ⚠️ Needs extra tooling |

### Why NOT Truffle ❌
Truffle is officially deprecated (Consensys shut it down in 2023). Do not start new projects with it.

### Why NOT Foundry (for now)
Foundry is excellent and faster than Hardhat. But:
- Tests are written in Solidity — steeper if you're learning Solidity at the same time
- Less JS ecosystem integration — harder to wire into a Next.js/Node.js monorepo
- Better once you're comfortable with Solidity

### Why Hardhat ✅
- Tests in JavaScript — same language as the rest of the stack
- Large plugin ecosystem (`hardhat-toolbox` gives you everything)
- Seamless with ethers.js and wagmi
- Local node is fast and configurable

---

## Backend Framework — Express vs Others

| | **Express** ✅ | Fastify | NestJS | Next.js API Routes |
|---|---|---|---|---|
| Type | Minimal | Minimal (faster) | Full MVC framework | Serverless functions |
| Learning curve | Very low | Low | High | Very low |
| TypeScript | Manual | Built-in | ✅ First-class | ✅ |
| Performance | Good | Excellent | Good | Good |
| Structure | You decide | You decide | Opinionated (Angular-like) | File-based |
| Docker-friendly | ✅ | ✅ | ✅ | ⚠️ Tied to Next.js |
| Good for Web3 indexing | ✅ | ✅ | ✅ | ⚠️ Cold start issues |

---

## Summary — What We Chose and Why

| Layer | Chosen | Runner-up | Reason |
|---|---|---|---|
| Frontend | **Next.js 14** | Vite + React | SSR, SEO, wagmi integration |
| Web3 hooks | **wagmi v2 + viem** | ethers.js | React-native, typed, smaller bundle |
| Smart contracts | **Hardhat** | Foundry | JS tests, easier onboarding |
| Backend | **Express** | Fastify | Simple, explicit, Docker-friendly |
| Backend Web3 | **ethers.js v6** | viem | No React needed server-side |
| ORM | **Prisma** | TypeORM / Drizzle | Type-safe, great DX, auto-migrations |
| Cache / Events | **Redis + Socket.io** | Polling | Pub/sub for real-time contract events |
| Contract testing | **Foundry** (+ Hardhat) | Hardhat alone | Fuzz + invariant tests in Solidity |
| Blockchain indexing | **The Graph** | Backend polling | Decentralised, GraphQL, production standard |
| File storage | **IPFS + Pinata** | S3 / Cloudinary | Decentralised, censorship-resistant |
| Frontend unit tests | **Vitest** | Jest | Faster, native ESM, same config as Vite/Next |
| E2E tests | **Playwright** | Cypress | Cross-browser, faster, better async support |
| DevOps | **Docker Compose** | Manual | Reproducible, teaches containers |

---

## ⚠️ Version Compatibility Notes

Known breaking changes and pinned versions to watch out for.

| Package | Pinned To | Why |
|---|---|---|
| `wagmi` | `^2.x` | RainbowKit 2.x requires wagmi `^2.9.0` — wagmi v3 is a breaking major release that RainbowKit hasn't caught up to yet. Do **not** upgrade wagmi to v3 until RainbowKit explicitly supports it. |

### wagmi v2 vs v3
- wagmi v3 dropped several hooks and changed the API surface significantly
- RainbowKit 2.x peer dep is locked to `wagmi@^2.9.0` (verified via `npm info @rainbow-me/rainbowkit peerDependencies`)
- Upgrading `package.json` to `wagmi@^3.x` will cause `npm install` to fail with an `ERESOLVE` conflict

**Last checked:** 2026-04-18
| Docs | **Obsidian** | Notion | Local, Markdown, no account needed |

---

## ORM — Prisma vs TypeORM vs Drizzle vs raw SQL

| | raw SQL | TypeORM | **Prisma** ✅ | Drizzle |
|---|---|---|---|---|
| Type safety | ❌ | ⚠️ Partial | ✅ Full, generated types | ✅ Full |
| Schema definition | SQL files | TS decorators | `schema.prisma` DSL | TS code |
| Migrations | Manual | Auto / manual | ✅ `prisma migrate` | Manual / `drizzle-kit` |
| Query API | Raw strings | ActiveRecord style | `prisma.model.findMany()` | SQL-like builder |
| Learning curve | Low (if you know SQL) | Medium | Low | Medium |
| Studio / UI | ❌ | ❌ | ✅ `prisma studio` | ❌ |
| Active development | — | ⚠️ Slower | ✅✅ | ✅✅ Growing fast |

### Why Prisma ✅
- Zero-boilerplate TypeScript types generated from your schema — no casting, no guessing
- `prisma migrate dev` creates SQL migration files and applies them automatically
- Prisma Studio gives you a browser-based DB GUI for free — useful while learning
- Works with PostgreSQL, MySQL, SQLite, MongoDB — no vendor lock-in
- Drizzle is a strong alternative once you're comfortable with SQL; Prisma is the better starting point

---

## Real-time Events — Redis + Socket.io vs Polling vs GraphQL Subscriptions

| | Polling | Server-Sent Events | **Redis + Socket.io** ✅ | GraphQL Subscriptions |
|---|---|---|---|---|
| Complexity | Very low | Low | Medium | High |
| Real-time | ⚠️ Near-real-time | ✅ One-way | ✅ Bi-directional | ✅ |
| Scales across instances | ❌ | ❌ | ✅ (Redis pub/sub) | ✅ (with broker) |
| Works with Express | ✅ | ✅ | ✅ | ⚠️ Needs Apollo |
| Good for contract events | ❌ (wasteful) | ✅ | ✅✅ | ✅ |

### Why Redis + Socket.io ✅
- Backend listens to `ProjectAdded` / `ProjectRemoved` events from the chain via ethers.js provider
- Publishes to a Redis channel — scales across multiple Express instances
- Socket.io emits to all connected browser clients instantly
- Frontend receives the event, updates the project list without a page reload or poll
- Redis also doubles as a cache (e.g., cache `getAllProjects` responses)

---

## Smart Contract Testing — Foundry vs Hardhat (extended)

Foundry is added *alongside* Hardhat — not replacing it.

| | Hardhat tests | **Foundry tests** ✅ (added) |
|---|---|---|
| Language | JavaScript / Mocha | Solidity |
| Fuzz testing | ❌ | ✅ built-in |
| Invariant testing | ❌ | ✅ built-in |
| Speed | Medium | Very fast (Rust) |
| Readable diffs on failure | ✅ | ✅ |

### Fuzz testing
Foundry automatically generates thousands of random inputs for your function and checks it never breaks.
```solidity
function testFuzz_AddProject(string memory name, string memory desc, string memory url) public {
    vm.prank(owner);
    portfolio.addProject(name, desc, url);
    assertEq(portfolio.projectCount(), 1);
}
```

### Invariant testing
Foundry repeatedly calls random sequences of functions and checks an invariant always holds.
```solidity
// projectCount() must always equal the number of active projects
function invariant_countMatchesActive() public view { ... }
```

---

## Blockchain Indexing — The Graph vs Backend Polling vs Moralis

| | Backend polling (`eth_getLogs`) | Moralis | **The Graph** ✅ |
|---|---|---|---|
| Decentralised | ❌ | ❌ | ✅ |
| Query language | Custom REST | REST / GraphQL | GraphQL |
| Historical data | ✅ (slow) | ✅ | ✅ (fast) |
| Cost | Infrastructure | Paid SaaS | Free on testnet |
| Production usage | Small projects | Mid-size | Uniswap, Aave, ENS |
| Reorg handling | Manual | ✅ | ✅ |

### How The Graph works
1. You write a **subgraph** — a manifest (`subgraph.yaml`), a GraphQL schema, and AssemblyScript mappings
2. The Graph node watches your contract, calls your mapping when an event fires, writes to its own DB
3. Your frontend queries `https://api.thegraph.com/subgraphs/name/...` with standard GraphQL — no RPC calls
4. Result: instant pagination, filtering, sorting over all historical events — impossible with `getAllProjects()` alone

---

## Decentralised Storage — IPFS + Pinata vs S3 vs Cloudinary

| | S3 / R2 | Cloudinary | **IPFS + Pinata** ✅ |
|---|---|---|---|
| Decentralised | ❌ | ❌ | ✅ |
| Cost | Pay per GB | Free tier | Free tier (1 GB) |
| Censorship-resistant | ❌ | ❌ | ✅ |
| Content-addressed | ❌ | ❌ | ✅ (CID = hash of content) |
| Image transforms | ❌ (manual) | ✅ built-in | ❌ |
| NFT-ready | ❌ | ❌ | ✅ (industry standard) |
| Setup complexity | Low | Very low | Low (Pinata wraps IPFS) |

### Content addressing
IPFS identifies files by their content hash (CID), not by a URL. If the file changes, the CID changes.  
This means: store the CID on-chain → the reference can never be tampered with.

### Pinata
Pinata is a managed IPFS pinning service — it keeps your files available on the IPFS network without you running your own node. Free tier is sufficient for a portfolio project.

---

## Frontend Unit Testing — Vitest vs Jest

| | Jest | **Vitest** ✅ |
|---|---|---|
| Speed | Medium (slow cold start) | Fast (Vite-native) |
| Native ESM | ⚠️ Needs transform | ✅ |
| Config reuse | Separate | Shares `vite.config.ts` |
| watch mode | ✅ | ✅ (faster) |
| Mocking | ✅ | ✅ (`vi.mock`, `vi.fn`) |
| Next.js support | ✅ (extra config) | ✅ (extra config) |
| TypeScript | ✅ | ✅ |

### Why Vitest ✅
- No transform config needed for ESM packages (wagmi, viem ship as ESM)
- Same `vi` API as Jest's `jest` — near-zero migration cost if you know Jest
- `vi.mock('wagmi', ...)` makes it easy to stub `useReadContract`, `useWriteContract` in hook tests

---

## E2E Testing — Playwright vs Cypress

| | Cypress | **Playwright** ✅ |
|---|---|---|
| Cross-browser | ⚠️ Chromium + Firefox (limited) | ✅ Chromium, Firefox, WebKit |
| Speed | Medium | Fast (parallel by default) |
| TypeScript | ✅ | ✅ |
| Auto-wait | ✅ | ✅ |
| Mobile emulation | ⚠️ | ✅ |
| Wallet/Web3 testing | Manual | ✅ (mock provider pattern) |
| CI integration | ✅ | ✅ |
| Maintained by | Cypress.io | Microsoft |

### Why Playwright ✅
- True cross-browser — tests run against Chromium, Firefox, and Safari engine (WebKit)
- Built-in network interception — mock the RPC provider, simulate wallet responses
- Faster in CI because test suites run in parallel workers by default
- `page.route()` lets you stub contract reads so E2E tests don't need a running Hardhat node

---

*See also: [[Overview|Architecture Overview]]*
