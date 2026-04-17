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
| DevOps | **Docker Compose** | Manual | Reproducible, teaches containers |
| Docs | **Obsidian** | Notion | Local, Markdown, no account needed |

---

*See also: [[Overview|Architecture Overview]]*
