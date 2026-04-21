# Dev Log

---

## 2026-04-21 — Full Stack Running, Docs & MetaMask Setup

**Done:**
- Fixed port 3000 conflict on host (`taskkill /PID`) — Docker stack came up cleanly
- All 4 containers running: `web3_hardhat`, `web3_backend`, `web3_postgres`, `web3_frontend`
- Added **Hardhat Local** network to MetaMask (RPC `http://127.0.0.1:8545`, chain ID `31337`)
- Imported Hardhat Account #0 into MetaMask (owner wallet for admin panel)
- Committed session work on `feature/portfolio-and-admin`:
  - `fix: downgrade wagmi to v2 for RainbowKit compat, deploy contract, add architecture and docker docs`
  - Files: `frontend/package.json`, `frontend/src/lib/deployment.json`, `docs/01 - Architecture/Tech Stacks.md`, `docs/01 - Architecture/Architecture Diagram.md`, `docs/05 - Docker/Setup.md`, `docs/05 - Docker/Docker Explained.md`

**Key reminder — contract redeploy on every Docker restart:**
Every time `docker compose down` + `docker compose up` is run, the Hardhat chain resets.
Must re-run: `cd contracts && npx hardhat run scripts/deploy.js --network localhost`
Then update `CONTRACT_ADDRESS` in `.env` if the address changes (it won't change if no prior deploys have happened — it'll always be `0x5FbDB2315678afecb367f032d93F642f64180aa3` on a fresh chain).

**What's left before this branch is done:**
- [ ] Verify app works end-to-end — connect wallet at `http://localhost:3000`, add a project via `/admin`, confirm it appears on `/`
- [ ] Test backend API: `curl http://localhost:4000/api/portfolio`
- [ ] Open PR: `feature/portfolio-and-admin` → `develop`

**Up next (feature branches):**
- [ ] `feature/prisma-postgres` — Prisma schema, DB migrations, REST routes
- [ ] `feature/redis-events` — Redis pub/sub + Socket.io real-time updates
- [ ] `feature/the-graph` — subgraph indexing on Sepolia
- [ ] `feature/ipfs-pinata` — IPFS file storage via Pinata
- [ ] `feature/foundry-tests` — fuzz + invariant tests
- [ ] Deploy to Sepolia testnet
- [ ] Host on Vercel (frontend) + Railway (backend)

---

## 2026-04-18 — Docker, wagmi Fix & Docs

**Done:**
- Fixed `ERESOLVE` during Docker build — downgraded `wagmi` from `^3.6.2` → `^2.14.0` (RainbowKit 2.x requires wagmi v2)
- `docker compose up --build` succeeded — all 4 containers built and running
- Deployed `Portfolio.sol` to local Hardhat: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- Set `CONTRACT_ADDRESS` in `.env`, `deployment.json` written to `frontend/src/lib/`
- Created `docs/01 - Architecture/Architecture Diagram.md` — full Mermaid diagram suite (stack overview, data flow, Docker network, planned features, git roadmap)
- Created `docs/05 - Docker/Docker Explained.md` — from-scratch Docker explainer (images, containers, volumes, networks, Compose)
- Expanded `docs/05 - Docker/Setup.md` — first-time setup, daily dev flow, useful commands
- Added version compatibility notes to `docs/01 - Architecture/Tech Stacks.md`
- Fixed Obsidian `.gitignore` (added `app.json`, `appearance.json`, `core-plugins.json`)

---

## 2026-04-17 — Project Kickoff & Setup

**Done:**
- Created project folder structure (`contracts/`, `backend/`, `docker/`, `docs/`)
- Wrote `Portfolio.sol` smart contract with 6 unit tests
- Wrote Express backend with ethers.js contract service
- Set up Docker Compose stack (Hardhat + backend + frontend + PostgreSQL)
- Set up Obsidian vault with full note structure
- Created GitHub repo: https://github.com/upMel/web3-portfolio
- Pushed all files via GitHub MCP Server from Copilot
- Created `develop` and `staging` branches
- Fixed diverged git history (local vs remote)
- Set local branch tracking (`develop` → `origin/develop`)
- Set branch protection rules on `main` and `staging`
- Wrote tech stack comparison docs (Next.js vs React, wagmi vs web3.js, etc.)
- Wrote Git workflow & branching strategy docs
- Wrote Tools & Setup documentation (MCP Server, Obsidian, Git & GitHub)

---

### Pending — Tools & Workflow

- [x] **GitHub Actions CI** — created `.github/workflows/ci.yml` (contracts: compile + test; backend: install)
- [x] **PR Template** — created 4 templates: `contracts.md`, `backend.md`, `frontend.md`, `docs.md`
- [ ] **Obsidian Git plugin** — deferred, install later from Community Plugins
- [ ] **Obsidian Dataview plugin** — deferred, install later from Community Plugins
- [x] **Filesystem MCP Server** — added `@modelcontextprotocol/server-filesystem` to `mcp.json`
- [x] **Make repo public** — unlocks full branch protection enforcement for free

---

### Pending — Project Development

- [x] **Frontend scaffold** — Next.js 14, TypeScript, Tailwind, App Router
- [x] **Install contract deps** — `npm install` done, 6 tests passing in CI
- [x] **Install backend deps** — `npm install` done
- [x] **Wire wagmi into frontend** — wagmi v2 + viem + RainbowKit configured
- [x] **Build portfolio page** — reads all active projects from contract, loading/error/empty states
- [x] **Build admin panel** — owner-only, add project form + remove button, wallet-gated
- [x] **Run full stack** — `docker compose up --build`
- [ ] **Deploy to Sepolia testnet** — first real deployment
- [ ] **Set up Vercel / Railway** — host frontend and backend

---

### Planned — Extended Stack

#### Prisma + PostgreSQL (`feature/prisma-postgres`)
- [ ] Install Prisma in backend, define schema (Project, Tag)
- [ ] Generate and run first migration
- [ ] Add backend REST routes that read/write off-chain project metadata
- [ ] Wire Prisma Client into Express service layer
- [ ] Expose Prisma Studio via docker-compose profile

#### Redis + Socket.io (`feature/redis-events`)
- [ ] Add Redis service to docker-compose
- [ ] Install `ioredis` + `socket.io` in backend
- [ ] Listen to `ProjectAdded` / `ProjectRemoved` contract events and publish to Redis pub/sub
- [ ] Emit events over WebSocket to connected clients
- [ ] Frontend subscribes and updates project list in real-time without polling

#### Foundry (`feature/foundry-tests`)
- [ ] Install Foundry alongside existing Hardhat setup
- [ ] Write fuzz tests for `addProject` / `removeProject`
- [ ] Write invariant test — `projectCount` always matches active projects
- [ ] Add Foundry test step to CI workflow

#### The Graph — Subgraph (`feature/the-graph`)
- [ ] Scaffold subgraph with `graph init`
- [ ] Define `schema.graphql` (Project entity)
- [ ] Write AssemblyScript mappings for `ProjectAdded` and `ProjectRemoved` events
- [ ] Deploy to The Graph Studio (Sepolia)
- [ ] Replace `getAllProjects()` RPC call on frontend with GraphQL query

#### IPFS + Pinata (`feature/ipfs-pinata`)
- [ ] Create Pinata account, get API key
- [ ] Add image upload field to admin panel
- [ ] Backend endpoint — receives file, pins to IPFS via Pinata SDK, returns CID
- [ ] Store IPFS CID alongside project on-chain or in Prisma
- [ ] Frontend renders project image from `https://gateway.pinata.cloud/ipfs/<CID>`

#### Vitest — Unit Tests (`feature/vitest`)
- [ ] Install Vitest + `@testing-library/react` + `@testing-library/user-event`
- [ ] Mock wagmi hooks with `vi.mock`
- [ ] Write tests for `usePortfolio` hooks (useProjects, useIsOwner, useAddProject)
- [ ] Write tests for ProjectCard and Navbar components
- [ ] Add frontend test step to CI workflow

#### Playwright — E2E Tests (`feature/playwright`)
- [ ] Install Playwright, configure for Next.js
- [ ] Test: portfolio page loads and shows project grid
- [ ] Test: `/admin` redirects unauthenticated users to connect prompt
- [ ] Test: wallet connection flow (mock provider)
- [ ] Add Playwright test step to CI workflow

---
