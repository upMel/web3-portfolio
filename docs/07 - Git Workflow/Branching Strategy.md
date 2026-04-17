# Git Workflow & Branching Strategy

This project follows a simplified **Git Flow** adapted for Web3 development — where contract deployments are irreversible and testnet/mainnet environments map cleanly to branches.

---

## Branch Structure

```
main
 └── staging
      └── develop
           ├── feature/frontend-setup
           ├── feature/wallet-connect
           ├── feature/portfolio-page
           ├── fix/contract-bug
           └── contracts/add-project-fn
```

---

## Branches

### `main` — Production
- **Maps to:** Mainnet (real ETH, real users)
- **Who merges here:** Nobody directly — only via PR from `staging`
- **Rule:** Every merge to `main` = a real deployment. Treat it as sacred.
- **Protected:** Yes — require PR review before merging

### `staging` — UAT / QA
- **Maps to:** Public testnet (Sepolia)
- **Who merges here:** PRs from `develop` when a feature set is ready for testing
- **Purpose:** Final check before production. Test with real wallets on testnet, check UI, run contract interactions end-to-end.
- **Rule:** No direct commits. PRs only from `develop`.

### `develop` — Integration
- **Maps to:** Local Hardhat node / private testnet
- **Who merges here:** All feature and fix branches
- **Purpose:** The working branch. All daily development flows through here.
- **Rule:** Should always be in a runnable state (tests pass, Docker works)

### `feature/*` — New Features *(short-lived)*
- Created from: `develop`
- Merged back to: `develop`
- Naming: `feature/wallet-connect`, `feature/portfolio-page`, `feature/admin-panel`
- Deleted after merge

### `fix/*` — Bug Fixes *(short-lived)*
- Created from: `develop` (or `main` for critical hotfixes)
- Merged back to: `develop` (or `main` + `develop` for hotfixes)
- Naming: `fix/contract-revert-bug`, `fix/cors-error`

### `contracts/*` — Contract-Specific Work *(short-lived)*
- Created from: `develop`
- Merged back to: `develop`
- Naming: `contracts/add-metadata-field`, `contracts/upgrade-ownable`
- **Why separate?** Contract changes are high-risk — isolated branches make review easier and keep audit history clean

---

## Flow Diagram

```
develop ──────────────────────────────────────────────► staging ──► main
   │                                                        ▲          ▲
   ├── feature/wallet-connect ──────────────────── PR ──┘          │
   ├── feature/portfolio-page ──────────────────── PR ──┘          │
   └── fix/cors-error ──────────────────────────── PR ──┘          │
                                                         staging PR ──┘
```

---

## Day-to-Day Workflow

### Starting a new feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Working and committing

```bash
git add .
git commit -m "feat: describe what you did"
git push origin feature/your-feature-name
```

### Finishing a feature — open a PR

Use the correct template URL based on what you changed (replace `your-branch`):

| Area changed | PR URL |
|---|---|
| Contracts | `https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=contracts.md` |
| Backend | `https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=backend.md` |
| Frontend | `https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=frontend.md` |
| Docs | `https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=docs.md` |

After the PR is merged:
```bash
git checkout develop
git pull origin develop
git branch -d feature/your-feature-name
```

See [[../08 - Tools & Setup/PR Templates|PR Templates]] for full checklist details.

### Promoting to staging (UAT)

On GitHub: `develop` → `staging` via PR

### Promoting to production

On GitHub: `staging` → `main` via PR  
Then deploy the contract and frontend.

---

## Commit Message Convention

Use **Conventional Commits** format:

| Prefix | When to use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Config, tooling, dependencies |
| `docs:` | Documentation changes |
| `test:` | Adding or fixing tests |
| `contracts:` | Solidity contract changes |
| `refactor:` | Code restructure, no behaviour change |

**Examples:**
```
feat: add wallet connect button
fix: resolve CORS error on /api/portfolio
contracts: add removeProject function
docs: update architecture overview
chore: add nodemon to backend devDependencies
```

---

## Branch Protection Rules (set on GitHub)

Go to **Settings → Branches → Add rule** for each protected branch:

| Branch | Rules |
|---|---|
| `main` | Require PR, require 1 approval, no direct push |
| `staging` | Require PR, no direct push |
| `develop` | Optional: require PR (relaxed for solo dev) |

---

## Current Branches

| Branch | Status | Purpose |
|---|---|---|
| `main` | ✅ Active | Production |
| `staging` | ✅ Active | UAT / QA |
| `develop` | ✅ Active | Daily development |

---

*See also: [[../06 - DevLog/Log|Dev Log]]*
