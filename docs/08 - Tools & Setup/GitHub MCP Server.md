# GitHub MCP Server

## What is MCP?

**MCP = Model Context Protocol** — an open standard created by Anthropic that lets AI assistants (like GitHub Copilot) connect to external tools and services. Instead of just answering questions, the AI can actually *take actions* on your behalf.

Think of it like giving Copilot hands — instead of just telling you "run this command," it can run it itself.

---

## What does the GitHub MCP Server specifically do?

It gives Copilot direct access to the GitHub API. This means Copilot can:

| Action | What it means in practice |
|---|---|
| Create repositories | Made `upMel/web3-portfolio` without opening a browser |
| Push files | Uploaded all project files in one commit |
| Create branches | Created `develop` and `staging` from `main` |
| Create pull requests | Can open PRs on your behalf |
| Read issues & PRs | Can summarize, search, or respond to issues |
| Search code | Can search across your repos |
| Manage releases | Can tag and create releases |

**Everything that normally requires you to go to github.com can now be done from within VS Code chat.**

---

## How it works under the hood

```
You type a message to Copilot
        ↓
Copilot decides an action is needed (e.g. "create a branch")
        ↓
Copilot calls the MCP server via HTTP
        ↓
MCP server calls GitHub's API using your Copilot session token
        ↓
GitHub does the action
        ↓
MCP returns the result to Copilot
        ↓
Copilot confirms in the chat
```

No token, no npm install — your existing Copilot login handles authentication.

---

## Setup steps (what was done)

1. Installed the **GitHub Copilot** extension in VS Code
2. Signed in to GitHub from VS Code (your `upMel` account)
3. VS Code automatically created the MCP config file at:
   ```
   C:\Users\MeletisPeppas\AppData\Roaming\Code\User\mcp.json
   ```
4. That file contains:
   ```json
   {
     "servers": {
       "io.github.github/github-mcp-server": {
         "type": "http",
         "url": "https://api.githubcopilot.com/mcp/"
       }
     }
   }
   ```
5. This points to GitHub's **remotely hosted** MCP server — it runs on their servers, not your machine

That's it. No Docker, no npm, no token management.

---

## What we actually did with it in this project

- ✅ Created `upMel/web3-portfolio` (private repo)
- ✅ Pushed all project files (contracts, backend, docker, docs) in one commit
- ✅ Created `develop` branch from `main`
- ✅ Created `staging` branch from `main`
- ✅ Pushed the branching strategy doc to `develop`

---

## What else you could do with it

- **Open a PR** from `develop` → `staging` directly from Copilot chat
- **Read issues** — ask "what open issues do I have?" and it will list them
- **Create a release** — tag `v1.0.0` on `main` after your first deploy
- **Search your code** on GitHub across branches
- **Assign issues** to yourself or collaborators

---

## Alternative: Self-hosted version

If you ever want to use the GitHub MCP server outside VS Code (e.g. in Claude Desktop):
```bash
docker run -e GITHUB_PERSONAL_ACCESS_TOKEN=your_token ghcr.io/github/github-mcp-server
```
But for VS Code Copilot, the remote hosted version you already have is the right setup.

---

## What could make this even better?

| Addition | What it adds |
|---|---|
| **Other MCP servers** | Connect more tools (see below) |
| **GitHub Actions** | Automate CI/CD triggered by what MCP creates (branches, PRs) |
| **GitHub Issues workflow** | Use Copilot to create, assign, and close issues as your task tracker |

### Other MCP Servers worth knowing

| MCP Server | What it connects | Useful for |
|---|---|---|
| `@modelcontextprotocol/server-filesystem` | Your local file system | Let Copilot read/write files |
| `@modelcontextprotocol/server-postgres` | PostgreSQL database | Query your DB from Copilot |
| `@modelcontextprotocol/server-brave-search` | Brave Search API | Real-time web search in Copilot |
| Playwright MCP | Browser automation | Test your frontend from Copilot |

These are installed locally and added to the same `mcp.json` file.

---

*See also: [[Overview]], [[Git & GitHub]]*
