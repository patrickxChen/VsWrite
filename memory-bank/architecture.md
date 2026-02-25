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
- `src/App.tsx`: Main app orchestration (focus mode, autosave, export-at-top, markdown bold insertion, theme selection)
- `src/components/Editor.tsx`: Editor textarea UI
- `src/components/Toolbar.tsx`: Focus/sound controls, bold action, and save status
- `src/components/ExportButtons.tsx`: Markdown/PDF export controls
- `src/components/ThemeSwitcher.tsx`: VS Code-like theme selector
- `src/components/ExtensionsMarketplace.tsx`: Extensions marketplace side panel UI
- `src/components/PetOverlay.tsx`: Animated screen pets overlay when extension is enabled
- `src/components/LeftSidebar.tsx`: VS Code-like left sidebar for primary actions (extensions/export/theme)
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

## Recent UI Refinement (Professional Pass)
- Updated brand description to: `Vscode, but for writing.`
- Reworked header branding with a cleaner custom `VsWrite` logo mark.
- Shifted from highly playful pastel styling to a more professional pastel-neutral aesthetic.
- Kept smooth interactions and typewriter feedback while reducing visual noise.

## Recent UX Update (Themes + Layout)
- Removed goal tracker panel from visible UI.
- Moved export controls to top header as requested.
- Added VS Code-inspired theme presets: `Dark+`, `Light+`, `Monokai`, and `Quiet Light`.
- Introduced CSS variable theme tokens and persisted user theme preference in local storage.

## Recent UX Update (Extensions Marketplace)
- Added a VS Code-like `Extensions` launcher in the top header.
- Implemented a right-side marketplace panel for extension discovery/management.
- Added first extension: `Screen Pets`.
- Added extension lifecycle controls: `Install`, `Enable/Disable`, and `Uninstall`.
- Persisted extension install/enable state in local storage.

## Recent UX Update (VS Code Sidebar + Sprite Pets)
- Moved `Extensions` and export actions into a dedicated left sidebar to match VS Code-like layout patterns.
- Added responsive sidebar behavior for tablet-width screens.
- Updated pet extension visuals from roaming emoji to sprite-like pets with idle/breathing animations.
- Moved pets to render on top of the writing board (editor container overlay), not across the entire screen.

## Recent UX Update (Alignment + Motion Refinement)
- Refined left sidebar actions into vertically aligned icon-only controls at top-left.
- Updated action symbols to be closer to VS Code-style iconography.
- Upgraded pets to full-body sprite composition (ears/body/legs/tail/eyes).
- Added active horizontal movement across the writing board, with walk/bounce/tail/shadow animation cycles.

## Recent UX Update (Docked Sidebar Fix)
- Fixed layout behavior so the left activity/sidebar remains docked on the left instead of collapsing to a top row at common viewport widths.
- Removed focus-mode dependency for sidebar visibility so core VS Code-style navigation stays consistently visible.

