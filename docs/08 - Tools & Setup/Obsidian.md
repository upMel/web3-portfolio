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

1. Opened VS Code in the project folder `<PROJECT_ROOT>`
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
4. Navigate to `<PROJECT_ROOT>/docs`
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

| Plugin | What it does | Status |
|---|---|---|
| **Git** | Auto-commits vault changes to GitHub on a schedule — docs stay in sync with code | ⬜ Not installed |
| **Dataview** | Query notes like SQL — e.g. show all `- [ ]` todos across every note in one view | ⬜ Not installed |
| **Calendar** | Visual calendar linked to daily notes | ⬜ Not installed |
| **Excalidraw** | Draw architecture diagrams inside notes | ⬜ Not installed |
| **Templater** | Smarter templates with dynamic content (dates, variables) | ⬜ Not installed |

### Priority installs

#### 1. Obsidian Git — ⬜ Not done yet
**What it does:** Automatically commits and pushes your vault to GitHub on a timer (e.g. every 10 minutes) or on vault close.

**Why it matters:** Right now, if you update a doc in Obsidian you have to manually `git add / commit / push`. This plugin does it for you silently in the background so your docs are always backed up and in sync.

**How to install:**
1. Settings → Community plugins → turn off Safe mode
2. Browse → search "Obsidian Git" → Install → Enable
3. Settings → Obsidian Git → set "Auto backup interval" to `10` (minutes)

#### 2. Dataview — ⬜ Not done yet
**What it does:** Lets you write queries inside notes that pull data from across the vault. Example — add this to any note:

````markdown
```dataview
TASK WHERE !completed
```
````

This renders a live list of every unchecked `- [ ]` task from every note in the vault.

**How to install:**
1. Settings → Community plugins → Browse → search "Dataview" → Install → Enable

---

*See also: [[Overview]], [[GitHub MCP Server]]*
