# Docker — Setup

## Commands

```bash
docker compose up
docker compose up -d
docker compose down
docker compose up --build
docker compose logs -f backend
docker compose exec backend sh
```

## Services

| Service | Port |
|---|---|
| hardhat | 8545 |
| backend | 4000 |
| postgres | 5432 |
| frontend | 3000 |

## Resources

- [Docker Docs](https://docs.docker.com)
- [Docker Compose Docs](https://docs.docker.com/compose)
