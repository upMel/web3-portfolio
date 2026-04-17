# Tools & Setup — Overview

A record of every tool connected to this project, why it was chosen, what it does, and how it was set up.

---

## Tools Installed & Configured

| Tool | Category | Status | Note |
|---|---|---|---|
| [[GitHub MCP Server]] | AI + GitHub integration | ✅ Done | Runs via Copilot, no install needed |
| [[Obsidian]] | Documentation | ✅ Done | This vault |
| [[Git & GitHub]] | Version control | ✅ Done | Repo, branches, protection rules |
| GitHub Actions CI | CI/CD | ⬜ Pending | Auto-run tests on every PR |
| PR Template | Workflow | ⬜ Pending | Consistent PR format + checklist |
| Obsidian Git plugin | Documentation | ⬜ Pending | Auto-sync docs to GitHub |
| Obsidian Dataview plugin | Documentation | ⬜ Pending | Query todos across all notes |
| Filesystem MCP Server | AI tooling | ⬜ Pending | Copilot accesses local files |
| Docker Desktop | DevOps | 🔜 Next | Needed to run the full stack |
| Node.js | Runtime | 🔜 Next | Needed for contracts + backend |
| MetaMask | Wallet | 🔜 Next | Browser extension for testing |

---

## What "setting up tools" means in this project

Each tool plays a specific role. They're not random — they form a chain:

```
You write code (VS Code)
  ↓
Copilot + MCP helps you manage GitHub without leaving VS Code
  ↓
Git tracks your changes, GitHub stores them safely
  ↓
Obsidian documents everything so you never forget decisions
  ↓
Docker runs the full stack (chain + backend + frontend) locally
  ↓
MetaMask lets you test wallet interactions in the browser
```

---

*Individual tool pages:*
- [[GitHub MCP Server]]
- [[Obsidian]]
- [[Git & GitHub]]
