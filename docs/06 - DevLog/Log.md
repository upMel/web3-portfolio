# Dev Log

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
- [ ] **Obsidian Git plugin** — install from Community Plugins, set auto-backup to 10 min
- [ ] **Obsidian Dataview plugin** — install from Community Plugins
- [ ] **Filesystem MCP Server** — add `@modelcontextprotocol/server-filesystem` to `mcp.json`
- [x] **Make repo public** — unlocks full branch protection enforcement for free

---

### Pending — Project Development

- [ ] **Frontend scaffold** — `npx create-next-app@latest frontend --typescript --tailwind --app --src-dir`
- [ ] **Install contract deps** — `cd contracts && npm install && npx hardhat test`
- [ ] **Install backend deps** — `cd backend && npm install`
- [ ] **Wire wagmi into frontend** — connect to local Hardhat chain
- [ ] **Build portfolio page** — read all projects from contract via wagmi
- [ ] **Build admin panel** — owner-only page to add/remove projects
- [ ] **Run full stack** — `docker compose up --build`
- [ ] **Deploy to Sepolia testnet** — first real deployment
- [ ] **Set up Vercel / Railway** — host frontend and backend

---
