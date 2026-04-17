# Git & GitHub

## What is Git vs GitHub?

| | Git | GitHub |
|---|---|---|
| What it is | Version control tool (runs locally) | Cloud hosting for Git repos |
| Where it lives | On your machine | On GitHub's servers |
| Works without the other | ✅ Yes (local only) | ❌ Needs Git to push |
| What it stores | Snapshots of your code over time | Those snapshots, remotely |

**Git** = the tool that tracks every change you make.  
**GitHub** = where you back it up, share it, and collaborate.

---

## Why version control matters for Web3

Smart contract deployments are **irreversible**. Once a contract is on mainnet, you can't edit it. Version control gives you:
- A clear history of every change before deployment
- The ability to roll back locally if something breaks
- A paper trail for audits — reviewers can see exactly what changed

---

## Setup steps (what was done)

### 1. Initialized local Git repo
```bash
cd <PROJECT_ROOT>
git init
git remote add origin https://github.com/upMel/web3-portfolio.git
git fetch origin
git checkout main
```

### 2. Created GitHub repository
- Done via **GitHub MCP Server** from Copilot chat
- Repo: `upMel/web3-portfolio` (public)
- All project files pushed in one commit: `d9b6eea`

### 3. Created branches
| Branch | Created from | Method |
|---|---|---|
| `main` | — | Auto-created with repo |
| `staging` | `main` | Via MCP from Copilot |
| `develop` | `main` | Via MCP from Copilot |

### 4. Set up local tracking
```bash
git branch --set-upstream-to=origin/main main
git fetch origin
git reset --hard origin/main
git checkout -b develop --track origin/develop
```

### 5. Branch protection rules
Set via **GitHub → Settings → Branches → Add branch protection rule**

| Branch | Rules applied |
|---|---|
| `main` | Require PR, no force push, no deletion, dismiss stale reviews, require conversation resolution |
| `staging` | Same as `main` |
| `develop` | No restrictions (solo dev, direct push allowed) |

> Note: The repo is public, so branch protection rules are fully enforced — even the owner cannot bypass them without changing the rules explicitly.

---

## Current repository state

- **Repo:** [github.com/upMel/web3-portfolio](https://github.com/upMel/web3-portfolio)
- **Default branch:** `main`
- **Active branches:** `main`, `staging`, `develop`
- **You are currently on:** `develop`

---

## Daily workflow

```bash
# Start a new feature
git checkout develop
git pull
git checkout -b feature/your-feature-name

# Commit work
git add .
git commit -m "feat: describe what you did"
git push origin feature/your-feature-name

# Then open a PR on GitHub: feature/... → develop
```

### Commit message convention

| Prefix | Use for |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Config, deps, tooling |
| `docs:` | Documentation only |
| `test:` | Tests |
| `contracts:` | Solidity changes |
| `refactor:` | Code cleanup, no behaviour change |

---

## Promotion flow

```
develop → staging → main
```

Each step is a **pull request** on GitHub. Never push directly to `staging` or `main`.

---

## Useful git commands reference

```bash
git status                        # What's changed locally
git log --oneline                 # Compact commit history
git diff                          # See exact line changes
git stash                         # Temporarily save uncommitted changes
git stash pop                     # Restore stashed changes
git branch -a                     # List all branches (local + remote)
git fetch origin                  # Update remote tracking info
git pull                          # Fetch + merge remote changes
git push                          # Push current branch to GitHub
git checkout -b feature/name      # Create and switch to new branch
git merge --no-ff feature/name    # Merge with a merge commit
```

---

*See also: [[../07 - Git Workflow/Branching Strategy|Branching Strategy]], [[GitHub MCP Server]]*
