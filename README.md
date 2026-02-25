# VsWrite

Vscode, but for writing.

## Features
- Focus mode toggle
- Typewriter sound effect toggle
- VS Code-style theme switcher (Dark+, Light+, Monokai, Quiet Light)
- Export to Markdown and PDF
- Session save/load through backend API

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
	- Deploys to EC2 via SSH and restarts services

Required repository secrets for deployment:
- `EC2_HOST`
- `EC2_USER`
- `EC2_SSH_KEY`

## NGINX + HTTPS (Production)
1. Install Docker and Docker Compose on EC2.
2. Place project in `/opt/vswrite`.
3. Configure DNS to the instance.
4. Add TLS certs (Let's Encrypt/certbot) and update NGINX config for `443` + redirect from `80`.

## Monitoring
- Prometheus scrapes backend metrics from `/metrics`.
- Grafana dashboard `VsWrite Overview` includes:
	- Request rate
	- P95 latency
	- Active sessions
	- Uptime
	- 5xx error trend

## Testing
- Frontend: `cd frontend && npm test`
- Backend: `cd backend && npm test`

## Notes
- App is intentionally modular and minimal for MVP scope.
- Optional Redis/PostgreSQL are included for session persistence strategy.
