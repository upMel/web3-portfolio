# PR Templates

This project uses multiple PR templates — one per area of the codebase. GitHub does not auto-select the template, so you must use the correct URL when opening a PR.

---

## Full procedure — how to open a PR

### Step 1 — Finish your work on the feature branch

```bash
git add .
git commit -m "feat: describe what you did"
git push origin feature/your-feature-name
```

### Step 2 — Pick the right template URL

Look at what files you changed and pick one:

| Area changed | Template URL |
|---|---|
| `contracts/` | `https://github.com/upMel/web3-portfolio/compare/develop...feature/your-feature-name?template=contracts.md` |
| `backend/` | `https://github.com/upMel/web3-portfolio/compare/develop...feature/your-feature-name?template=backend.md` |
| `frontend/` | `https://github.com/upMel/web3-portfolio/compare/develop...feature/your-feature-name?template=frontend.md` |
| `docs/` only | `https://github.com/upMel/web3-portfolio/compare/develop...feature/your-feature-name?template=docs.md` |

> Changed multiple areas (e.g. contracts + backend)? Use the **contracts** template — it's the highest-risk area and its checklist is the most important.

> Merging into `staging` or `main` instead of `develop`? Replace `develop` in the URL with the target branch.

### Step 3 — Open the URL in your browser

The PR form will open pre-filled with the checklist. Fill in:
- **Title** — short description (`feat: add portfolio page`)
- **What does this PR do?** — one paragraph
- **Check every box** you've actually verified

### Step 4 — Submit the PR and wait for CI

Once GitHub Actions CI is set up, a check will run automatically. **Do not merge until it's green.**

### Step 5 — Merge and clean up

After the PR is merged on GitHub:
```bash
git checkout develop
git pull origin develop
git branch -d feature/your-feature-name
```

---

## Template files location

```
.github/
└── PULL_REQUEST_TEMPLATE/
    ├── contracts.md
    ├── backend.md
    ├── frontend.md
    └── docs.md
```

---

## What each template checks

### `contracts.md`
- Hardhat tests pass
- Every state-changing function emits an event
- Access control is correct (`onlyOwner` etc.)
- No hardcoded addresses or keys
- Checks-effects-interactions pattern followed (reentrancy safe)
- ABI changes reflected in the backend service

### `backend.md`
- Server starts without errors
- Input validation on all route params
- No secrets hardcoded
- CORS correctly configured
- Error responses follow consistent format
- Contract service updated if ABI changed

### `frontend.md`
- Dev server and build both pass
- Tested with MetaMask connected and disconnected
- No hardcoded contract addresses (uses `NEXT_PUBLIC_*` env vars)
- Loading and error states handled for wallet interactions
- Responsive / mobile checked

### `docs.md`
- Obsidian internal links are valid
- No sensitive info in docs
- Home note updated if new note added
- Dev Log updated if a task was completed

---

*See also: [[../07 - Git Workflow/Branching Strategy|Branching Strategy]]*
