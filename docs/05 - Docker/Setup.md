# Docker — Setup

---

## Environments at a Glance

| | Local Dev | Sepolia Testnet | Production (Mainnet) |
|---|---|---|---|
| Blockchain | Hardhat node in Docker (chainId 31337) | Sepolia (chainId 11155111) | Ethereum mainnet |
| Contract deploy | Manual after `docker compose up` | `npx hardhat run scripts/deploy.js --network sepolia` | Same, `--network mainnet` |
| Frontend | `localhost:3000` (Next.js dev server) | Vercel preview | Vercel production |
| Backend | `localhost:4000` (Express in Docker) | Railway | Railway |
| Env file | `.env` (root) + `frontend/.env.local` | `.env` with Sepolia values | `.env` with mainnet values |
| RPC URL | `http://hardhat:8545` (internal Docker network) | Alchemy / Infura Sepolia URL | Alchemy / Infura mainnet URL |
| Wallet key | Hardhat test account (pre-funded, fake) | Real wallet with testnet ETH | Real wallet with real ETH |

---

## First-Time Local Setup Flow

> Do this once per machine. After that, skip to "Daily Dev Flow".

### 1. Create env files
```bash
cp .env.example .env
cp frontend/.env.local.example frontend/.env.local
```

### 2. Start the stack
```bash
docker compose up --build
```
Wait until you see:
```
web3_hardhat | Started HTTP and WebSocket JSON-RPC server at http://0.0.0.0:8545/
```

### 3. Deploy the contract (new terminal)
```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```
Output:
```
Portfolio deployed to: 0xABC123...
Deployment info saved to frontend/src/lib/deployment.json
```

### 4. Set the contract address in .env
Open `.env` and set:
```
CONTRACT_ADDRESS=0xABC123...   ← paste the address from step 3
```

### 5. Restart the stack (so containers pick up the new env)
```bash
docker compose down
docker compose up
```

Now open http://localhost:3000 — the app is fully wired.

---

## Daily Dev Flow

> The Hardhat node is **ephemeral** — it loses all state when the container stops.
> So you must redeploy the contract every time you restart Docker.

```bash
# 1. Start stack
docker compose up

# 2. Redeploy contract (new terminal, wait for hardhat node to be ready)
cd contracts
npx hardhat run scripts/deploy.js --network localhost

# 3. Update CONTRACT_ADDRESS in .env if the address changed, then restart
docker compose down && docker compose up
```

> **Tip:** The contract address will be different on every fresh Hardhat node start.
> Always check `frontend/src/lib/deployment.json` for the latest address after deploying.

---

## Sepolia Testnet Flow

### Prerequisites
- A wallet with Sepolia ETH (get from a faucet: https://sepoliafaucet.com)
- An Alchemy or Infura account for the RPC URL

### .env values needed
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=0xYOUR_WALLET_PRIVATE_KEY
CONTRACT_ADDRESS=   ← fill after deploy
```

### Deploy
```bash
cd contracts
npx hardhat run scripts/deploy.js --network sepolia
```
Copy the address into `.env` as `CONTRACT_ADDRESS`, then deploy frontend/backend.

---

## Useful Commands

```bash
docker compose up               # start all services (attached)
docker compose up -d            # start in background (detached)
docker compose down             # stop and remove containers
docker compose up --build       # rebuild images then start
docker compose logs -f backend  # tail backend logs
docker compose logs -f frontend # tail frontend logs
docker compose exec backend sh  # open shell inside backend container
docker compose exec hardhat sh  # open shell inside hardhat container
```

## Services

| Service | Port | Notes |
|---|---|---|
| hardhat | 8545 | Local blockchain node |
| backend | 4000 | Express REST API |
| postgres | 5432 | PostgreSQL database |
| frontend | 3000 | Next.js dev server |

## Resources

- [Docker Docs](https://docs.docker.com)
- [Docker Compose Docs](https://docs.docker.com/compose)
