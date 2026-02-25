# Architecture

## High-Level System
- Frontend: React + TypeScript app focused on minimal writing UX
- Backend: Node.js + Express + TypeScript API for session persistence and metrics
- Reverse Proxy: NGINX routing frontend and backend paths
- Monitoring: Prometheus scraping backend metrics and Grafana dashboards
- Optional persistence backends: PostgreSQL and Redis (plus memory fallback)

## Folder Purposes

### Root
- `docker-compose.yml`: Runs full app stack (frontend, backend, nginx, prometheus, grafana, postgres, redis)
- `.github/workflows/ci.yml`: Test/build checks and Docker image build validation
- `.github/workflows/cd.yml`: Build/push images and deploy to EC2 via SSH
- `README.md`: Setup, run, deploy, and monitoring instructions

### Frontend (`frontend/`)
- `src/App.tsx`: Main app orchestration (focus mode, autosave, export, markdown bold insertion)
- `src/components/Editor.tsx`: Editor textarea UI
- `src/components/Toolbar.tsx`: Focus/sound controls, bold action, and save status
- `src/components/GoalTracker.tsx`: Word count + word goal progress UI
- `src/components/ExportButtons.tsx`: Markdown/PDF export controls
- `src/lib/api.ts`: REST client for session create/get/update
- `src/lib/wordCount.ts`: Word counting utility
- `src/lib/typewriterSound.ts`: Typewriter sound generator
- `Dockerfile`: Production frontend container image

### Backend (`backend/`)
- `src/app.ts`: Express app composition + metrics instrumentation
- `src/server.ts`: API bootstrap
- `src/routes/sessions.ts`: Session REST endpoints
- `src/services/sessionService.ts`: Request validation schema
- `src/store/sessionStore.ts`: Store interface contract
- `src/store/memoryStore.ts`: In-memory session implementation
- `src/store/postgresStore.ts`: PostgreSQL-backed store via Prisma
- `src/store/redisStore.ts`: Redis-backed store
- `src/store/index.ts`: Store factory selected by environment (`DATA_STORE`)
- `prisma/schema.prisma`: Canonical DB schema for PostgreSQL
- `Dockerfile`: Production backend container image

### Infrastructure (`infra/`)
- `nginx/nginx.conf`: Reverse proxy rules (`/`, `/sessions`, `/health`, `/metrics`)
- `monitoring/prometheus.yml`: Prometheus scrape config
- `monitoring/grafana/provisioning/**`: Auto-provisioned datasource and dashboard config

## API Surface
- `POST /sessions`: Create writing session
- `GET /sessions/:id`: Retrieve session
- `PUT /sessions/:id`: Update session
- `GET /health`: Health check endpoint
- `GET /metrics`: Prometheus metrics endpoint

## Full Database Schema

### Prisma Schema (`backend/prisma/schema.prisma`)
```prisma
generator client {
	provider = "prisma-client-js"
}

datasource db {
	provider = "postgresql"
	url      = env("DATABASE_URL")
}

model Session {
	id        String   @id @default(uuid())
	content   String
	wordCount Int
	wordGoal  Int
	createdAt DateTime @default(now())
	updatedAt DateTime @updatedAt

	@@map("sessions")
}
```

### Equivalent SQL DDL
```sql
CREATE TABLE sessions (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	content TEXT NOT NULL,
	word_count INTEGER NOT NULL,
	word_goal INTEGER NOT NULL,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Runtime Data Flow
1. User types in frontend editor.
2. Frontend computes word count and schedules autosave.
3. Frontend calls backend session endpoint.
4. Backend validates payload and persists via configured store.
5. Metrics are emitted for request rate/latency and active sessions.
6. Prometheus scrapes metrics; Grafana visualizes service health.

## Modularity Notes
- UI concerns split into reusable components.
- Persistence concerns split behind `SessionStore` interface.
- Infra concerns isolated under `infra/` and workflow files.
- This structure avoids monolith growth and supports future scaling.

## Recent Frontend UX Upgrade
- Refined visual design with elevated cards, subtle gradients, and improved spacing/contrast.
- Added a `Bold` formatting action in toolbar that wraps selected text with markdown markers (`**text**`).
- Bold action supports cursor-only insertion by placing cursor between inserted markers (`****` -> cursor between).

