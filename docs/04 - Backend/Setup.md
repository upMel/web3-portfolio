# Backend — Setup

## Stack

- **Node.js + Express** — REST API server
- **ethers.js** — read/watch contract events server-side
- **PostgreSQL** (optional) — cache off-chain data
- **dotenv** — environment config

## Setup Commands

```bash
cd backend
npm install
npm run dev
```

## Key Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api/portfolio | Get all portfolio items |
| GET | /api/portfolio/:id | Get single item |
| GET | /api/health | Health check |
