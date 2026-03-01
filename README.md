# VsWrite

Vscode, but for writing.

## Start Here (Beginner Path)
If deployment feels too advanced, use the easy mode first.

1. Install Docker Desktop.
2. Run:
	- `docker compose -f docker-compose.easy.yml up --build`
3. Open:
	- `http://localhost`

This mode runs only 3 containers: frontend, backend, and nginx.
No AWS, no GHCR, no TLS setup, no monitoring stack.

## Features
- Google sign-in account support
- Account-scoped restore of last writing session/draft
- Focus mode toggle
- Typewriter sound effect toggle
- VS Code-style theme selection from bottom-left Settings (gear)
- Account icon is placed above the bottom-left Settings icon
- VS Code-like icon sidebar for key actions
- Sidebar remains docked on the left across normal viewport sizes
- Export to Markdown and Save As from left sidebar
- Import `.txt` / `.md` files from left sidebar
- Extensions marketplace panel (VS Code-inspired)
- Screen Pets extension with install/enable/disable/uninstall, full-body sprites, and board movement
- Session save/load through backend API

## Environment
- Frontend Google auth key:
	- `VITE_GOOGLE_CLIENT_ID` (see `frontend/.env.example`)

## Project Structure
- `frontend/` React + TypeScript + Tailwind app
- `backend/` Node.js + Express + TypeScript API
- `infra/nginx/` reverse proxy configuration
- `infra/monitoring/` Prometheus + Grafana setup
- `.github/workflows/` CI/CD pipelines
- `memory-bank/` planning and architecture documents

## Quick Start (Local)
1. Install dependencies:
	 - `cd frontend && npm install`
	 - `cd ../backend && npm install`
2. Start locally (two terminals):
	- Frontend: `cd frontend && set VITE_API_URL=http://localhost:4000 && npm run dev`
	 - Backend: `cd backend && npm run dev`

## Docker
- Build and run full stack:
	- `docker compose up --build`
- Access:
	- App via NGINX: `http://localhost`
	- Prometheus: `http://localhost:9090`
	- Grafana: `http://localhost:3001`

## Easy vs Full Deploy
- Easy mode (recommended to start):
	- `docker-compose.easy.yml`
	- Simple local/server deploy with minimal services
- Full mode:
	- `docker-compose.yml`
	- Includes monitoring + postgres + redis services
- Production mode (advanced):
	- `docker-compose.prod.yml`
	- GHCR images + HTTPS + EC2 + GitHub CD

## Backend Data Store
Set `DATA_STORE` for backend:
- `memory` (default)
- `postgres`
- `redis`

When using PostgreSQL, set `DATABASE_URL` and run Prisma migration commands in `backend/`.

## CI/CD Workflow
- CI (`.github/workflows/ci.yml`):
	- Runs tests for frontend/backend
	- Builds frontend/backend
	- Builds Docker images
- CD (`.github/workflows/cd.yml`):
	- Builds and pushes images to GHCR
	- Passes frontend build-time auth env (`VITE_GOOGLE_CLIENT_ID`)
	- Deploys to EC2 via SSH using `docker-compose.prod.yml`
	- Runs post-deploy health check (`/health`) and fails on unhealthy rollout

Required repository secrets for deployment:
- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`
- `VITE_GOOGLE_CLIENT_ID`

## Beginner Server Deploy (No CI/CD)
For a first cloud deploy, you can skip GitHub Actions entirely:

1. SSH into your server.
2. Clone the repo.
3. Run:
	- `docker compose -f docker-compose.easy.yml up --build -d`
4. Visit server IP in browser.

You can move to the advanced production workflow later.

## NGINX + HTTPS (Production)
1. Install Docker and Docker Compose on EC2 and clone the repo into `/opt/vswrite`.
2. Copy `.env.prod.example` to `.env.prod` and fill in secrets (DB password, URLs, etc.).
3. Place TLS cert files at:
	- `infra/nginx/certs/fullchain.pem`
	- `infra/nginx/certs/privkey.pem`
4. Ensure your domain points to the instance.
5. Deploy with:
	- `docker compose --env-file .env.prod -f docker-compose.prod.yml pull`
	- `docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --remove-orphans`

Production files:
- `docker-compose.prod.yml`
- `infra/nginx/nginx.prod.conf`
- `.env.prod.example`

## Monitoring
- Prometheus scrapes backend metrics from `/metrics`.
- Grafana dashboard `VsWrite Overview` includes:
	- Request rate
	- P95 latency
	- Active sessions
	- Uptime
	- 5xx error trend
- Baseline Prometheus alerts are defined in `infra/monitoring/alerts.yml`:
	- `VsWriteBackendDown`
	- `VsWriteHighP95Latency`
	- `VsWriteHigh5xxErrorRate`
	- `VsWriteNoSessionTraffic`

### Monitoring Verification
- Check Prometheus rules loaded:
	- `http://localhost:9090/rules`
- Check active alerts:
	- `http://localhost:9090/alerts`

## Testing
- Frontend: `cd frontend && npm test`
- Backend: `cd backend && npm test`

## Notes
- App is intentionally modular and minimal for MVP scope.
- Optional Redis/PostgreSQL are included for session persistence strategy.
