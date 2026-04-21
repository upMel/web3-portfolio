# Backend — Setup

## Stack

- **Node.js + Express** — REST API server
- **ethers.js** — read/watch contract events server-side
- **Prisma + PostgreSQL** — ORM + relational DB for off-chain metadata
- **Redis + ioredis** — pub/sub broker for contract event fanout
- **Socket.io** — WebSocket server; pushes contract events to browser clients in real time
- **dotenv** — environment config

## Setup Commands

```bash
cd backend
npm install
npm run dev
```

### Prisma commands

```bash
# Apply migrations and regenerate client
npx prisma migrate dev --name <migration-name>

# Open browser-based DB UI
npx prisma studio
```

## Key Endpoints

| Method | Route | Description |
|---|---|---|
| GET | /api/health | Health check |
| GET | /api/portfolio | All portfolio items (from chain + Prisma metadata) |
| GET | /api/portfolio/:id | Single project |
| POST | /api/upload | Upload image → pin to IPFS via Pinata, return CID |

## Real-time Events

The backend listens to `ProjectAdded` and `ProjectRemoved` contract events via an ethers.js provider.  
On each event it publishes to a **Redis** channel; a Socket.io adapter fans the message out to all connected browser clients.

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [ioredis Docs](https://github.com/redis/ioredis)
- [Socket.io Docs](https://socket.io/docs/v4/)
