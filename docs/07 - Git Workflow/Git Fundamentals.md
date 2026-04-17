# Git Fundamentals

A complete reference for how Git actually works — not just the commands, but what's happening underneath.

---

## What Git is

Git is a **distributed version control system**. It takes snapshots of your project over time and lets you navigate between them.

- **Distributed** = every developer has a full copy of the entire history. There's no single server that "owns" the code.
- **Version control** = every change is recorded with who made it, when, and why.

---

## The three areas of Git

Every file in your project lives in one of three places:

```
Working Directory  →  Staging Area (Index)  →  Repository (.git/)
  (your files)          (git add)                (git commit)
```

| Area | What it is | Command to move out |
|---|---|---|
| Working Directory | Files on disk as you edit them | `git add <file>` |
| Staging Area | Changes you've selected for the next commit | `git commit` |
| Repository | Permanent history of snapshots | `git push` (to share) |

**Why staging exists:** You can edit 10 files but only commit 3 of them. Staging lets you group related changes into one logical commit.

---

## Commits

A **commit** is a snapshot of your entire project at a point in time. It contains:
- The full state of every tracked file
- A pointer to the previous commit (its **parent**)
- A SHA-1 hash (unique ID like `d9b6eea`)
- Author, timestamp, and message

Commits form a **chain** — each one points back to its parent:

```
d9b6eea ← 85936ab ← 6d57492 ← 763aaa4  (newest →)
```

You can never truly "delete" history — you can only add new commits.

---

## Branches

A branch is just a **pointer to a commit**. That's it. There's no copying of files.

```
main     →  [commit A] → [commit B] → [commit C]
                                              ↑
develop  →  ────────────────────────────────────→ [commit D] → [commit E]
```

When you commit on `develop`, the `develop` pointer moves forward. `main` stays where it was.

**HEAD** is a special pointer that tells Git which branch you're currently on:
```
HEAD → develop → commit E
```

### Common branch commands
```bash
git branch                        # list local branches
git branch -a                     # list all branches (including remote)
git branch feature/my-feature     # create a new branch
git checkout feature/my-feature   # switch to it
git checkout -b feature/my-feature  # create AND switch (shortcut)
git branch -d feature/my-feature  # delete a branch (safe — won't delete if unmerged)
git branch -D feature/my-feature  # force delete (even if unmerged)
```

---

## Merging

Merging combines two branches. There are two kinds:

### Fast-forward merge
When the target branch hasn't diverged — Git just moves the pointer:
```
Before:   main → A → B
                       ↖
          develop → A → B → C → D

After:    main → A → B → C → D
          develop → A → B → C → D
```
No merge commit created. History stays linear.

### Three-way merge
When both branches have new commits — Git creates a new **merge commit**:
```
Before:   main → A → B → C
                           ↖ (merge commit M)
          develop → A → B → D → E

After:    main → A → B → C → M
                         ↗
                    D → E
```
Merge commit `M` has two parents: `C` and `E`.

### Squash merge (what GitHub uses on PRs in this project)
Combines all commits from the feature branch into a **single new commit** on the target:
```
feature:  A → B → C → D → E (5 messy work-in-progress commits)
main:     A → B → [S]       (one clean squashed commit)
```
Good for keeping `main`'s history clean. The original feature commits disappear from the main branch history.

---

## Rebasing

Rebasing **replays** your commits on top of another branch, rewriting their history:
```
Before:   main → A → B → C
          feature → A → B → D → E

After rebase feature onto main:
          main → A → B → C
          feature → A → B → C → D' → E'
```
`D'` and `E'` are new commits (new SHA hashes) with the same changes but a new parent.

**Rule:** Never rebase branches that others are working on. On solo projects it's fine. In this project, you don't need to rebase — squash merge handles cleanup.

---

## Remote repositories

A **remote** is a version of your repo hosted elsewhere (e.g. GitHub). You can have multiple remotes.

```bash
git remote -v                          # list remotes
git remote add origin <url>            # add a remote named "origin"
```

`origin` is just the conventional name for the main remote — it has no special meaning.

### Tracking branches
When you run `git checkout -b develop --track origin/develop`, you're telling Git:
> "My local `develop` corresponds to `origin/develop`. When I `git pull`, pull from there."

You can see all tracking relationships with:
```bash
git branch -vv
```

---

## Fetch vs Pull vs Push

| Command | What it does |
|---|---|
| `git fetch` | Downloads changes from remote but does NOT apply them |
| `git pull` | Downloads AND merges into your current branch (`fetch` + `merge`) |
| `git push` | Uploads your local commits to the remote |

**Why `fetch` exists:** You can see what changed on the remote before deciding to merge it. Safe way to stay informed without touching your working code.

```bash
git fetch origin           # download everything
git log origin/develop     # inspect remote develop without merging
git pull                   # now merge when you're ready
```

---

## `git pull` vs `git pull origin develop`

```bash
git pull                    # uses the tracked remote/branch (quiet)
git pull origin develop     # explicitly names remote and branch (verbose)
```

Both do the same thing when you're on a branch that tracks `origin/develop`. The second prints:
```
* branch develop -> FETCH_HEAD
```
This means it fetched into a temporary ref (`FETCH_HEAD`) before merging — it's just informational noise.

**Use `git pull` when** your branch has tracking set up (the normal case).  
**Use `git pull origin <branch>` when** you want to pull a *different* branch than the tracked one.

---

## The staging area in depth

```bash
git add file.js             # stage one file
git add .                   # stage everything in current directory
git add -p                  # interactive — stage chunks of a file, not the whole thing
git reset file.js           # unstage a file (keeps your changes)
git restore file.js         # discard changes in working directory (destructive!)
```

---

## Undoing things

| Situation | Command | Safe? |
|---|---|---|
| Undo `git add` (unstage) | `git reset HEAD <file>` | ✅ |
| Edit last commit message | `git commit --amend` | ✅ if not pushed |
| Add forgotten file to last commit | `git add file && git commit --amend` | ✅ if not pushed |
| Undo a commit (keep changes) | `git reset --soft HEAD~1` | ✅ |
| Undo a commit (discard changes) | `git reset --hard HEAD~1` | ⚠️ destructive |
| Revert a pushed commit safely | `git revert <sha>` | ✅ creates a new commit |

**Rule:** Never use `--hard` or `--force` on commits that have already been pushed to a shared branch.

---

## Reading the log

```bash
git log                          # full history
git log --oneline                # compact — one line per commit
git log --oneline --graph        # visual branch diagram
git log --oneline -10            # last 10 commits
git log --author="Meletis"       # filter by author
git log -- contracts/            # commits that touched the contracts/ folder
```

---

## Diff

```bash
git diff                         # changes not yet staged
git diff --staged                # changes staged but not committed
git diff main..develop           # what develop has that main doesn't
git diff <sha1> <sha2>           # diff between two commits
```

---

## Stash

Temporarily shelve changes so you can switch branches without committing:

```bash
git stash                        # save working directory state
git stash list                   # see all stashes
git stash pop                    # restore most recent stash (removes it from stash list)
git stash apply                  # restore but keep in stash list
git stash drop                   # delete most recent stash
```

---

## Tags

Tags mark a specific commit permanently — used for releases:

```bash
git tag                          # list all tags
git tag v1.0.0                   # create a lightweight tag
git tag -a v1.0.0 -m "First release"  # annotated tag (preferred — includes message)
git push origin v1.0.0           # push a tag (not pushed by default)
git push origin --tags           # push all tags
```

---

## `.gitignore`

Lists files/patterns Git should never track:

```
node_modules/      # never commit dependencies — they're in package-lock.json
.env               # NEVER commit secrets
*.log              # build/log noise
dist/              # compiled output
```

**If you accidentally committed a file:**
```bash
git rm --cached .env             # remove from tracking without deleting the file
echo ".env" >> .gitignore
git commit -m "chore: stop tracking .env"
```

---

## SHA hashes

Every commit, tree, and file in Git is identified by a SHA-1 hash (40 hex characters). You only need the first 7 to reference it:

```bash
git show d9b6eea                 # show what that commit changed
git checkout d9b6eea             # go back in time to that commit (detached HEAD)
git checkout develop             # return to normal
```

**Detached HEAD state:** When you checkout a commit directly (not a branch), HEAD points to a commit instead of a branch. Any commits you make won't belong to any branch — they'll be lost when you switch back. This is safe for exploring; just don't commit in this state without immediately creating a branch.

---

## How this project uses Git

```
feature/your-feature (short-lived)
        ↓ PR + CI + squash merge
develop (long-lived — daily work)
        ↓ PR + CI + merge
staging (long-lived — pre-prod testing)
        ↓ PR + CI + merge
main    (long-lived — production-ready)
```

See [[Branching Strategy]] for the full workflow.
