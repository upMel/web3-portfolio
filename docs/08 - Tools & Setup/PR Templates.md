# PR Templates

This project uses multiple PR templates — one per area of the codebase. GitHub does not auto-select the template, so you must use the correct URL when opening a PR.

---

## How to open a PR with the right template

Replace `your-branch` with your actual branch name and click the link for the area you changed:

### Contracts (Solidity, tests, deploy scripts)
```
https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=contracts.md
```

### Backend (Express routes, ethers.js services, config)
```
https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=backend.md
```

### Frontend (Next.js pages, components, wagmi hooks)
```
https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=frontend.md
```

### Docs (Obsidian notes, README, architecture)
```
https://github.com/upMel/web3-portfolio/compare/develop...your-branch?template=docs.md
```

> If merging into `staging` or `main` instead of `develop`, replace `develop` in the URL with the target branch name.

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
