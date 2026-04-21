# Docker — Explained From Zero

A complete guide to understanding Docker, what it does, and exactly what is running in this project.

---

## The Problem Docker Solves

Imagine you build an app on your laptop. It works perfectly. You send it to a friend and it crashes immediately. Why? Because their machine has a different Node version, a different OS, different environment variables, different global packages. "It works on my machine" is one of the most common problems in software development.

**Docker solves this by bundling your app together with everything it needs to run** — the OS layer, the runtime, the dependencies, the configuration — into a single portable unit called a **container**.

You ship the container. It runs identically everywhere.

---

## Key Concepts

### Image
An **image** is a blueprint — a read-only snapshot of an environment. Think of it like a recipe or a class in programming.

Examples:
- `node:20-alpine` — an image with Node.js 20 installed on a lightweight Linux (Alpine)
- `postgres:16-alpine` — an image with PostgreSQL 16 installed

Images are downloaded from Docker Hub (like npm but for containers).

### Container
A **container** is a running instance of an image. Think of it like an object created from a class.

- One image can spawn many containers
- Each container is isolated — its own filesystem, its own network, its own processes
- Containers are ephemeral by default — when they stop, their data is gone (unless you use volumes)

### Dockerfile
A **Dockerfile** is a recipe for building your own custom image. It's a text file with step-by-step instructions.

Example — our backend Dockerfile (`docker/Dockerfile.backend`):
```dockerfile
FROM node:20-alpine      # start from Node 20 on Alpine Linux
WORKDIR /app             # set the working directory inside the container
COPY package*.json ./    # copy package files first (for layer caching)
RUN npm install          # install dependencies
COPY . .                 # copy the rest of the source code
EXPOSE 4000              # document that the app uses port 4000
CMD ["npm", "run", "dev"] # the command to run when the container starts
```

### Volume
A **volume** is a way to persist data or share files between your host machine and a container.

- Without a volume: files only exist inside the container. Gone when it stops.
- With a volume: files are synced between your machine and the container in real time.

In this project, volumes are used so that when you edit code on your laptop, the running container sees the change immediately (hot reload).

### Network
By default, containers are isolated and can't talk to each other. Docker **networks** connect them.

In this project, all containers are on the `web3-net` network, so the backend can reach the Hardhat node at `http://hardhat:8545` — using the container name as a hostname.

### Docker Compose
`docker compose` is a tool for defining and running **multiple containers together** from a single file (`docker-compose.yml`).

Instead of running 4 separate `docker run` commands with 20 flags each, you write one YAML file and run:
```bash
docker compose up
```

---

## What Happens When You Run `docker compose up --build`

```
docker compose up --build
        │
        ├── reads docker-compose.yml
        │
        ├── for each service:
        │     ├── --build: reads its Dockerfile and builds an image
        │     │     ├── pulls base image (e.g. node:20-alpine) from Docker Hub if not cached
        │     │     ├── runs each instruction (COPY, RUN npm install, etc.)
        │     │     └── produces a named image (e.g. web3-backend:latest)
        │     │
        │     └── starts a container from that image
        │           ├── applies port mappings (host:container)
        │           ├── mounts volumes
        │           ├── injects environment variables
        │           └── runs the CMD
        │
        └── attaches all containers to the web3-net network
```

The `--build` flag forces Docker to rebuild images from scratch. Without it, Docker reuses cached images.

---

## The Containers in This Project

Looking at Docker Desktop, you'll see these running inside the `web3` compose group:

### `web3_hardhat` — Port 8545
**What it is:** A local Ethereum blockchain node running Hardhat.

**What it does:**
- Simulates a real Ethereum network on your machine
- Comes pre-loaded with 20 test accounts, each funded with 10,000 fake ETH
- Accepts `eth_sendTransaction`, `eth_call`, and all standard JSON-RPC calls
- Mines a block instantly whenever a transaction is sent (no 12-second wait like mainnet)

**Why it's needed:** You need a blockchain to deploy your smart contract to. You can't test against mainnet (costs real money). Hardhat gives you a free, instant, local chain.

**Dockerfile:** `docker/Dockerfile.hardhat`
**Start command:** `npx hardhat node --hostname 0.0.0.0`

---

### `web3_backend` — Port 4000
**What it is:** An Express.js REST API server.

**What it does:**
- Connects to the Hardhat node via ethers.js at `http://hardhat:8545`
- Reads contract data (project list) from the blockchain
- Exposes HTTP endpoints:
  - `GET /api/portfolio` — returns all active projects
  - `GET /api/portfolio/:id` — returns a single project
  - `GET /api/health` — health check

**Why it's needed:** The frontend could read the blockchain directly (it does via wagmi), but a backend is useful for server-side reads, caching, and later for off-chain data (Prisma/PostgreSQL).

**Dockerfile:** `docker/Dockerfile.backend`
**Start command:** `npm run dev`

---

### `web3_frontend` — Port 3000
**What it is:** A Next.js development server.

**What it does:**
- Serves the portfolio web app at `http://localhost:3000`
- Uses wagmi to connect directly to the blockchain from the browser
- Talks to the backend at `http://localhost:4000` for some reads
- Hot-reloads when you edit files (because of the volume mount)

**Why it's needed:** This is the actual UI — the public portfolio page and admin panel.

**Dockerfile:** `docker/Dockerfile.frontend`
**Start command:** `npm run dev`

---

### `web3_postgres` — Port 5432
**What it is:** A PostgreSQL database.

**What it does (for now):** Just runs, waiting to be used. Not yet wired into the backend.

**Why it's there:** Planned for the Prisma feature branch — storing off-chain project metadata, tags, and other data that doesn't need to live on the blockchain (too expensive / slow).

**Image:** `postgres:16-alpine` (pulled directly from Docker Hub, no custom Dockerfile needed)

---

## Port Mapping Explained

In Docker Desktop you see `8545:8545`, `4000:4000`, `5432:5432`, `3000:3000`.

The format is `HOST_PORT:CONTAINER_PORT`.

- **Left side** = the port on your laptop
- **Right side** = the port inside the container

So `4000:4000` means: "traffic arriving at `localhost:4000` on my machine gets forwarded into the container's port 4000".

You can remap them — e.g. `8080:3000` would mean the Next.js app (which listens on 3000 inside) is accessible at `localhost:8080` on your machine.

---

## Volumes in This Project

From `docker-compose.yml`:
```yaml
volumes:
  - ./backend:/app          # your local backend/ folder is mounted at /app inside the container
  - /app/node_modules       # BUT node_modules inside the container is NOT overwritten by the host
```

The second line (`/app/node_modules`) is an **anonymous volume** — it tells Docker: "keep the node_modules that were installed during the image build; don't let the host folder overwrite them". This is important because `node_modules` on Windows and inside a Linux container are incompatible.

Result: you edit `.js` files on your laptop → the container sees the change instantly → Express/Next.js hot-reloads.

---

## Why the Contract Must Be Redeployed on Every Restart

The Hardhat container has **no persistent volume for its chain data**. Every time it starts, it boots a fresh chain — block 0, 20 test accounts, no contracts.

So the deployment workflow is always:
1. Start the stack (`docker compose up`)
2. Wait for Hardhat node to be ready
3. Run `npx hardhat run scripts/deploy.js --network localhost`
4. Copy the new address into `.env`
5. Restart so containers pick it up

This is fine for development. On Sepolia or mainnet, the contract is deployed once and lives there permanently.

---

## The Random Container Names

You may notice containers like `admiring_driscoll` or `exciting_lehmann` in Docker Desktop. These are **leftover containers from previous runs** that were not part of the current compose group. Docker assigns random adjective+surname names to containers that don't have a defined `container_name`.

In our `docker-compose.yml`, the main services have explicit names (`web3_hardhat`, `web3_backend`, etc.). The random-named ones are old orphans — safe to delete from Docker Desktop.

---

## Quick Reference — Commands

| Command | What it does |
|---|---|
| `docker compose up` | Start all services (attached, logs in terminal) |
| `docker compose up -d` | Start all services in background |
| `docker compose up --build` | Rebuild images then start |
| `docker compose down` | Stop and remove containers (data in volumes survives) |
| `docker compose down -v` | Stop, remove containers AND volumes (wipes postgres data) |
| `docker compose logs -f backend` | Tail logs for the backend container |
| `docker compose exec backend sh` | Open a shell inside the running backend container |
| `docker ps` | List all running containers |
| `docker images` | List all local images |

---

## Mental Model Summary

```
Your Laptop
│
├── Docker Engine (the daemon running in the background)
│
└── docker-compose.yml defines:
      │
      ├── web3_hardhat    ← fake Ethereum blockchain   (port 8545)
      ├── web3_backend    ← Express API                (port 4000)
      ├── web3_frontend   ← Next.js UI                 (port 3000)
      └── web3_postgres   ← PostgreSQL database        (port 5432)
            │
            └── all connected via web3-net (internal Docker network)
                  backend talks to hardhat as http://hardhat:8545
                  your browser talks to frontend as http://localhost:3000
```
