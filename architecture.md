## Architettura

freedihare-2R-first-app/
│
│
├─ **app/** ← frontend - React SPA (Vite)
│ ├─ src/
│ │ ├─ components/
│ │ │ ├─ atoms
│ │ │ ├─ molecules
│ │ │ └─ organisms
│ │ │
│ │ ├─ gql_crud/
│ │ │ ├─ ...models/
│ │ │ │ ├─ queries.ts
│ │ │ │ └─ mutations.ts
│ │ │ └─ .
│ │ │
│ │ ├─ utils/
│ │ │
│ │ ├─ types/
│ │ │
│ │ ├─ App.tsx
│ │ └─ main.tsx
│ ├─ dist/
│ │
│ ├─ eslint.config.js
│ ├─ index.html
│ ├─ package.json
│ ├─ tsconfig.app.json
│ ├─ tsconfig.json
│ ├─ tsconfig.node.json
│ └─ vite.config.json
│
├─ **backend/** ← Node + GraphQL
│ ├─ generated/
│ │ └─ prisma/
│ │
│ ├─ GraphQL/
│ │ ├─ Models/
│ │ │ ├─ ...model/
│ │ │ │ ├─ index.ts
│ │ │ │ ├─ model.mutations.ts
│ │ │ │ ├─ model.objects.ts
│ │ │ │ └─ model.queries.ts
│ │ │ └─ index.ts
│ │ │
│ │ ├─ Builder.ts
│ │ ├─ enum.ts
│ │ └─ schema.ts
│ │
│ ├─ prisma/
│ │ └─ schema.prisma
│ │
│ ├─ src/
│ │ ├─ lib/
│ │ │ └─ prisma.ts
│ │ └─ index.ts
│ │
│ ├─ .env
│ ├─ package.json
│ ├─ prisma.config.ts
│ └─ tsconfig.json
│
├─ **electron/**
│ ├─ main.js
│ └─ preload.js
│
├─ .env
├─ electron-builder.md
├─ package.json ← root (electron-builder)
└─ tsconfig.json

## Come comunicano

Electron
│
├─ avvia backend Node
│
└─ carica React build
│
▼
GraphQL (localhost interno)
│
▼
Prisma
│
▼
Supabase (Postgres)

## Flusso user-session

- **Frontend** -> sceglie
- **Backend** -> riceve
- **GraphQL** -> lo mette nel context
- **Prisma** -> lo usa

| Layer               | Cosa fa               |
| ------------------- | --------------------- |
| **Frontend**        | salva userId attivo   |
| **Request GraphQL** | lo manda negli header |
| **Backend Context** | lo legge              |
| **Resolver**        | lo usa                |
