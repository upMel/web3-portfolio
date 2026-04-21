# Architecture Diagram

Full system architecture — all services, communication paths, and data flows.

> Rendered automatically by Obsidian. Switch to **Reading View** (Ctrl+E) if you see raw code.

---

## Full Stack Overview

# Architecture Diagram

Full system architecture — all services, communication paths, and data flows.

> Rendered automatically by Obsidian. Switch to **Reading View** (Ctrl+E) if you see raw code.
> 
> **Legend:** Solid arrows = currently working &nbsp;|&nbsp; Dashed arrows = planned feature branch

---

## Full Stack Overview

```mermaid
flowchart TB
    classDef browser  fill:#1e3a5f,stroke:#60a5fa,stroke-width:2px,color:#e0f2fe
    classDef wallet   fill:#2d1b3d,stroke:#c084fc,stroke-width:2px,color:#f3e8ff
    classDef frontend fill:#1e3355,stroke:#3b82f6,stroke-width:2px,color:#bfdbfe
    classDef backend  fill:#14291f,stroke:#22c55e,stroke-width:2px,color:#bbf7d0
    classDef chain    fill:#2d1515,stroke:#f87171,stroke-width:2px,color:#fecaca
    classDef database fill:#2d2008,stroke:#fbbf24,stroke-width:2px,color:#fef3c7
    classDef external fill:#1c1c1c,stroke:#6b7280,stroke-width:1px,stroke-dasharray:4 3,color:#9ca3af
    classDef planned  fill:#1a1a2e,stroke:#7c3aed,stroke-width:1px,stroke-dasharray:3 3,color:#c4b5fd

    subgraph BROWSER["🌐  Browser"]
        UI(["Next.js UI\n:3000"]):::browser
        WG(["wagmi + viem\nContract Hooks"]):::browser
        RK(["RainbowKit\nWallet UI"]):::browser
        SKC(["Socket.io Client ✳️\nreal-time"]):::planned
        GQL(["GraphQL Client ✳️\nThe Graph"]):::planned
    end

    subgraph WALLET["👛  MetaMask"]
        MM(["MetaMask\nSigns & Broadcasts"]):::wallet
    end

    subgraph DOCKER["🐳  Docker — web3-net"]
        subgraph FE_BOX["  frontend  :3000  "]
            NEXT(["Next.js\nDev Server"]):::frontend
        end
        subgraph BE_BOX["  backend  :4000  "]
            EXP(["Express\nREST API"]):::backend
            ETH(["ethers.js"]):::backend
            EL(["Event Listener ✳️"]):::planned
            SKSRV(["Socket.io Server ✳️"]):::planned
            PRS(["Prisma ORM ✳️"]):::planned
        end
        subgraph HH_BOX["  hardhat  :8545  "]
            NODE(["Hardhat Node\nLocal Blockchain"]):::chain
            SOL[["Portfolio.sol\nSmart Contract"]]:::chain
        end
        subgraph PG_BOX["  postgres  :5432 ✳️  "]
            DB[("PostgreSQL ✳️")]:::database
        end
        subgraph RD_BOX["  redis  :6379 ✳️  "]
            REDIS[("Redis\nPub/Sub ✳️")]:::database
        end
    end

    subgraph EXT["☁️  External  (planned)"]
        GRAPH{{"The Graph\nSubgraph"}}:::external
        IPFS{{"IPFS\nPinata"}}:::external
        ALCHEMY{{"Alchemy / Infura\nRPC — prod"}}:::external
    end

    %% ── Current flows ──────────────────────────────────────
    UI      -->|"HTTP"| NEXT
    WG      -->|"JSON-RPC  eth_call\nport 8545"| NODE
    UI      -->|"REST  GET /api/portfolio\nport 4000"| EXP
    RK      --> MM
    MM      -->|"signed tx"| NODE
    EXP     --> ETH
    ETH     -->|"JSON-RPC  read-only"| NODE
    NODE    --> SOL

    %% ── Planned flows ──────────────────────────────────────
    SOL     -.->|"ProjectAdded event ✳️"| EL
    EL      -.->|"PUBLISH ✳️"| REDIS
    REDIS   -.->|"SUBSCRIBE ✳️"| SKSRV
    SKSRV   -.->|"WebSocket push ✳️"| SKC
    EXP     -.->|"off-chain data ✳️"| PRS
    PRS     -.->|"SQL ✳️"| DB
    SOL     -.->|"index events ✳️"| GRAPH
    GRAPH   -.->|"GraphQL ✳️"| GQL
    UI      -.->|"metadata upload ✳️"| IPFS
    NODE    -.->|"prod: replaced by"| ALCHEMY

    style BROWSER fill:transparent,stroke:#60a5fa,stroke-width:2px,color:#fff
    style WALLET  fill:transparent,stroke:#c084fc,stroke-width:2px,color:#fff
    style DOCKER  fill:transparent,stroke:#6366f1,stroke-width:2px,color:#fff
    style EXT     fill:transparent,stroke:#6b7280,stroke-width:1px,stroke-dasharray:4 3,color:#9ca3af
    style FE_BOX  fill:transparent,stroke:#3b82f6,stroke-width:1px,color:#93c5fd
    style BE_BOX  fill:transparent,stroke:#22c55e,stroke-width:1px,color:#86efac
    style HH_BOX  fill:transparent,stroke:#f87171,stroke-width:1px,color:#fca5a5
    style PG_BOX  fill:transparent,stroke:#fbbf24,stroke-width:1px,color:#fde68a
    style RD_BOX  fill:transparent,stroke:#fb923c,stroke-width:1px,stroke-dasharray:3 3,color:#fdba74
```

---

## Data Flow — Reading Projects (Public Page)

```mermaid
sequenceDiagram
    actor User as 👤 User
    participant FE as 🖥️ Next.js :3000
    participant WG as ⚙️ wagmi/viem
    participant BE as 📡 Express :4000
    participant ETH as 🔌 ethers.js
    participant HH as ⛓️ Hardhat :8545
    participant SC as 📄 Portfolio.sol

    User->>FE: opens localhost:3000

    Note over FE,SC: ── Path A · Direct contract read via wagmi ──
    FE->>WG: useProjects()
    WG->>HH: eth_call getAllProjects()
    HH->>SC: execute getAllProjects()
    SC-->>HH: Project[]
    HH-->>WG: ABI-encoded result
    WG-->>FE: decoded Project[]

    Note over FE,SC: ── Path B · REST API read via backend ──
    FE->>BE: GET /api/portfolio
    BE->>ETH: getAllProjects()
    ETH->>HH: eth_call getAllProjects()
    HH->>SC: execute getAllProjects()
    SC-->>HH: Project[]
    HH-->>ETH: ABI-encoded result
    ETH-->>BE: formatted JSON
    BE-->>FE: JSON response

    FE-->>User: renders ProjectCards grid
```

---

## Data Flow — Adding a Project (Admin Panel)

```mermaid
sequenceDiagram
    actor Owner as 🔑 Owner
    participant AD as 🛡️ Admin /admin
    participant WG as ⚙️ wagmi/viem
    participant RK as 🌈 RainbowKit
    participant MM as 🦊 MetaMask
    participant HH as ⛓️ Hardhat :8545
    participant SC as 📄 Portfolio.sol

    Owner->>AD: fills form, clicks Add Project

    Note over AD,MM: ── Wallet signature flow ──
    AD->>WG: useAddProject(name, desc, url)
    WG->>RK: trigger wallet popup
    RK->>MM: show transaction details
    MM->>Owner: Sign this transaction?
    Owner->>MM: ✅ confirms

    MM->>HH: eth_sendTransaction → addProject()
    Note over AD: isPending = true · Waiting for wallet...

    Note over HH,SC: ── On-chain execution ──
    HH->>SC: execute addProject()
    SC->>SC: stores Project struct
    SC->>SC: emits ProjectAdded event
    SC-->>HH: transaction receipt

    Note over AD: isConfirming = true · Confirming...
    HH-->>WG: receipt confirmed
    WG-->>AD: isSuccess = true
    AD->>WG: refetch() — reload list
    AD-->>Owner: form resets, project appears ✅
```

---

## Docker Internal Network

```mermaid
flowchart LR
    classDef host     fill:transparent,stroke:#4b5563,stroke-width:1px,color:#9ca3af
    classDef fe       fill:#1e3355,stroke:#3b82f6,stroke-width:2px,color:#bfdbfe
    classDef be       fill:#14291f,stroke:#22c55e,stroke-width:2px,color:#bbf7d0
    classDef hh       fill:#2d1515,stroke:#f87171,stroke-width:2px,color:#fecaca
    classDef pg       fill:#2d2008,stroke:#fbbf24,stroke-width:2px,color:#fef3c7
    classDef rd       fill:#2d1515,stroke:#fb923c,stroke-width:1px,stroke-dasharray:3 3,color:#fed7aa

    subgraph HOST["💻  Your Laptop"]
        H1(["localhost:3000"]):::host
        H2(["localhost:4000"]):::host
        H3(["localhost:8545"]):::host
        H4(["localhost:5432"]):::host
        H5(["localhost:6379 ✳️"]):::host
    end

    subgraph NET["🐳  Docker  web3-net"]
        C1(["web3_frontend\n:3000"]):::fe
        C2(["web3_backend\n:4000"]):::be
        C3(["web3_hardhat\n:8545"]):::hh
        C4[("web3_postgres\n:5432")]:::pg
        C5[("web3_redis\n:6379 ✳️")]:::rd
    end

    H1 <-->|"port map"| C1
    H2 <-->|"port map"| C2
    H3 <-->|"port map"| C3
    H4 <-->|"port map"| C4
    H5 <-.->|"port map ✳️"| C5

    C1 -->|"backend:4000"| C2
    C2 -->|"hardhat:8545"| C3
    C2 -.->|"postgres:5432 ✳️"| C4
    C2 -.->|"redis:6379 ✳️"| C5
```

---

## Planned Feature Flows

---

### ✳️ Real-Time Events — Redis + Socket.io

```mermaid
sequenceDiagram
    actor Owner as 🔑 Owner
    participant SC as 📄 Portfolio.sol
    participant EL as 👂 Event Listener
    participant RD as 🔴 Redis Pub/Sub
    participant SS as 📡 Socket.io Server
    participant SC2 as 🌐 Socket.io Client
    participant UI as 🖥️ Next.js UI

    Owner->>SC: addProject() tx confirmed
    SC->>EL: emits ProjectAdded event

    Note over EL,SS: ── Backend pub/sub pipeline ──
    EL->>RD: PUBLISH project:added {payload}
    RD->>SS: delivers to subscriber

    SS->>SC2: emit(projectAdded, project)
    SC2->>UI: update React state
    UI-->>Owner: ✅ new project appears — no refresh needed
```

---

### ✳️ Off-Chain Metadata — Prisma + PostgreSQL

```mermaid
flowchart LR
    classDef chain    fill:#2d1515,stroke:#f87171,stroke-width:2px,color:#fecaca
    classDef db       fill:#2d2008,stroke:#fbbf24,stroke-width:2px,color:#fef3c7
    classDef api      fill:#14291f,stroke:#22c55e,stroke-width:2px,color:#bbf7d0
    classDef fe       fill:#1e3355,stroke:#3b82f6,stroke-width:2px,color:#bfdbfe

    SC[["Portfolio.sol\nid · name · description\nurl · createdAt · active"]]:::chain
    DB[("PostgreSQL\ntags · views · images\nextended metadata")]:::db

    subgraph BE["Express Backend"]
        ETH(["ethers.js\nreads contract"]):::api
        PRS(["Prisma Client\nreads/writes DB"]):::api
        API(["REST API\nmerges both sources"]):::api
    end

    FE(["Next.js Frontend"]):::fe

    ETH -->|"eth_call"| SC
    PRS -->|"SQL SELECT"| DB
    API -->|"joined by project id"| ETH
    API -->|"joined by project id"| PRS
    API -->|"unified JSON"| FE
```

---

### ✳️ Blockchain Indexing — The Graph

```mermaid
sequenceDiagram
    participant SC as 📄 Portfolio.sol
    participant IDX as 🕸️ The Graph Indexer
    participant SG as 📦 Subgraph\nAssemblyScript mappings
    participant GQL as 🔷 GraphQL Endpoint
    participant FE as 🖥️ Next.js Frontend

    SC->>IDX: emits ProjectAdded / ProjectRemoved
    IDX->>SG: triggers mapping handler
    SG->>SG: stores Project entity

    Note over FE,GQL: ── Query replaces slow eth_call ──
    FE->>GQL: query { projects { id name url } }
    GQL-->>FE: fast indexed JSON response

    Note over FE: replaces useReadContract(getAllProjects) with useQuery(GET_PROJECTS)
```

---

### ✳️ Decentralised Storage — IPFS + Pinata

```mermaid
sequenceDiagram
    actor Owner as 🔑 Owner
    participant AD as 🛡️ Admin Panel
    participant PIN as 📌 Pinata API
    participant IPFS as 🌐 IPFS Network
    participant SC as 📄 Portfolio.sol

    Owner->>AD: uploads image / metadata file
    AD->>PIN: POST /pinning/pinFileToIPFS

    Note over PIN,IPFS: ── Pinata pins to IPFS ──
    PIN->>IPFS: store + replicate file
    IPFS-->>PIN: Content ID (CID)
    PIN-->>AD: ipfs://QmABC123...

    AD->>SC: addProject(name, desc, ipfs://QmABC123...)
    Note over SC: url field stores the IPFS CID
    SC-->>AD: ✅ tx confirmed

    Note over IPFS: File is permanent · decentralised · censorship-resistant
```

---

### ✳️ Advanced Testing — Foundry

```mermaid
flowchart TB
    classDef sol      fill:#2d1515,stroke:#f87171,stroke-width:2px,color:#fecaca
    classDef hh       fill:#14291f,stroke:#22c55e,stroke-width:2px,color:#bbf7d0
    classDef fd       fill:#1e2d5f,stroke:#818cf8,stroke-width:2px,color:#c7d2fe
    classDef pass     fill:#14291f,stroke:#4ade80,stroke-width:2px,color:#86efac

    SOL[["📄 Portfolio.sol"]]:::sol

    subgraph HH["Hardhat — current"]
        UT(["Unit Tests\nMocha / Chai\n6 passing"]):::hh
    end

    subgraph FD["Foundry — planned"]
        FZ(["Fuzz Tests\naddProject with\n256 random inputs"]):::fd
        INV(["Invariant Tests\nprojectCount always\nmatches active array"]):::fd
        GAS(["Gas Snapshots\nforge snapshot"]):::fd
    end

    PASS(["✅ All tests pass\nCI green"]):::pass

    SOL --> UT
    SOL --> FZ
    SOL --> INV
    SOL --> GAS

    UT  -->|"npm test"| PASS
    FZ  -->|"forge test"| PASS
    INV -->|"stateful fuzzing"| PASS
    GAS -->|"gas report"| PASS
```

---

## Feature Branch Roadmap

```mermaid
gitGraph
    commit id: "scaffold"
    commit id: "smart contract + tests"
    commit id: "frontend + admin panel"

    branch feature/prisma-postgres
    checkout feature/prisma-postgres
    commit id: "Prisma schema"
    commit id: "DB migrations"
    commit id: "REST routes"

    checkout main
    branch feature/redis-events
    checkout feature/redis-events
    commit id: "Redis pub/sub"
    commit id: "Socket.io server"
    commit id: "Socket.io client"

    checkout main
    branch feature/the-graph
    checkout feature/the-graph
    commit id: "subgraph schema"
    commit id: "AS mappings"
    commit id: "deploy subgraph"

    checkout main
    branch feature/ipfs-pinata
    checkout feature/ipfs-pinata
    commit id: "Pinata upload"
    commit id: "IPFS CID in contract"

    checkout main
    branch feature/foundry-tests
    checkout feature/foundry-tests
    commit id: "fuzz tests"
    commit id: "invariant tests"
    commit id: "gas snapshots"
```

---

## Notes

| Symbol | Meaning |
|---|---|
| Solid arrow `-->` | Currently implemented and working |
| Dashed arrow `-.->` | Planned — not yet built |
| ✳️ | Planned feature |
| `[[ ]]` shape | Smart contract |
| `[( )]` shape | Database / persistent store |
| `{{ }}` shape | External service |
| `([ ])` shape | Application service / API |
