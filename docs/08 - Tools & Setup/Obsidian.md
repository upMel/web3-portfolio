# Obsidian

## What is Obsidian?

**Obsidian** is a local Markdown note-taking app that works as a personal knowledge base (called a "vault"). Unlike Notion or Confluence, everything is stored as plain `.md` files on your machine — no cloud account, no subscription required for the basics.

For a development project it acts as your **living wiki** — architecture decisions, setup steps, daily logs, comparisons — all linked together.

---

## Why Obsidian and not Notion / Confluence?

| | Obsidian | Notion | Confluence |
|---|---|---|---|
| Storage | Local files (your machine) | Cloud only | Cloud only |
| Works offline | ✅ Always | ❌ | ❌ |
| Free tier | ✅ Fully free | ⚠️ Limited | ⚠️ Limited |
| File format | Plain `.md` | Proprietary | Proprietary |
| Git-friendly | ✅ Commit docs alongside code | ❌ | ❌ |
| Speed | Instant | Slow | Slow |
| Plugins | ✅ Large ecosystem | Limited | Limited |

The key advantage here: **docs live inside the repo**. When you push code, you push docs too. Everything stays in sync.

---

## Setup steps (what was done)

1. Opened VS Code in the project folder `C:\Users\MeletisPeppas\Desktop\web3`
2. Copilot created the vault structure:
   - `.obsidian/app.json` — vault settings (relative links, Markdown mode)
   - `.obsidian/workspace.json` — layout (file explorer open, home note as default)
3. Created the initial note structure:

```
docs/
├── .obsidian/              ← Vault config (auto-managed by Obsidian)
├── 00 - Home.md            ← Dashboard — links to everything
├── 01 - Architecture/
│   ├── Overview.md         ← System diagram + flow
│   └── Tech Stacks.md      ← Tech comparison tables
├── 02 - Smart Contracts/
│   └── Getting Started.md
├── 03 - Frontend/
│   └── Setup.md
├── 04 - Backend/
│   └── Setup.md
├── 05 - Docker/
│   └── Setup.md
├── 06 - DevLog/
│   └── Log.md              ← Daily progress journal
├── 07 - Git Workflow/
│   └── Branching Strategy.md
└── 08 - Tools & Setup/     ← This folder
    ├── Overview.md
    ├── GitHub MCP Server.md
    ├── Obsidian.md
    └── Git & GitHub.md
```

4. Opened Obsidian → **"Open folder as vault"** → selected `docs/`

---

## How to open the vault

1. Open Obsidian
2. Click **"Open another vault"** (bottom left)
3. Select **"Open folder as vault"**
4. Navigate to `C:\Users\MeletisPeppas\Desktop\web3\docs`
5. Start at `00 - Home.md`

---

## Key features to use

### Internal links
Link between notes with `[[Note Name]]` — Obsidian builds a knowledge graph from these.

### Graph view
`Ctrl+G` — visual map of how all your notes connect to each other. Useful once the vault grows.

### Daily notes (optional plugin)
Auto-creates a dated note each day — good for the Dev Log.

### Dataview plugin (optional)
Query your notes like a database. Example: show all tasks marked `- [ ]` across every note.

---

## Useful plugins to consider installing

Go to **Settings → Community plugins → Browse**

| Plugin | What it does |
|---|---|
| **Dataview** | Query notes like SQL — list all todos, all projects, etc. |
| **Calendar** | Visual calendar linked to daily notes |
| **Git** | Auto-commit vault changes to GitHub from inside Obsidian |
| **Excalidraw** | Draw architecture diagrams inside notes |
| **Templater** | Smarter templates with dynamic content (dates, variables) |

---

*See also: [[Overview]], [[GitHub MCP Server]]*
