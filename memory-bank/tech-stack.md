# Tech Stack

## Architecture Style
- Full-stack web app with decoupled frontend and backend
- REST API communication over HTTPS
- Containerized multi-service deployment

## Frontend
- React (TypeScript)
- Vite (build tool)
- Tailwind CSS (minimal utility styling)
- Optional libraries:
  - `jspdf` / `pdf-lib` for PDF export
  - `file-saver` for browser file downloads

## Backend
- Node.js + Express (TypeScript)
- API endpoints for session CRUD and metrics
- Validation with `zod` or similar schema validation
- Logging with `pino` (or equivalent)

## Data Layer (Optional)
### PostgreSQL Path
- PostgreSQL for durable session persistence
- ORM/Query layer: Prisma (preferred) or Drizzle/Knex

### Redis Path
- Redis for fast ephemeral session/state persistence
- Optional hybrid mode: Redis cache + PostgreSQL source of truth

## DevOps
- Docker + Docker Compose for local orchestration
- NGINX as reverse proxy to frontend/backend
- TLS/HTTPS via Let's Encrypt certbot (or cloud-managed cert)
- GitHub Actions for CI/CD
- AWS EC2 (Ubuntu) as primary deployment target

## Observability
- Prometheus for metric scraping and time-series storage
- Grafana for dashboards and alert panels
- Backend metrics examples:
  - Request count and status codes
  - Request latency (histogram)
  - Active sessions/users (gauge)
  - Process uptime and memory usage

## Testing
- Frontend: Vitest + React Testing Library
- Backend: Jest/Vitest + Supertest
- Linting/formatting: ESLint + Prettier

## Security & Configuration
- Environment variables via `.env` files (never commit secrets)
- CORS configured for production frontend origin
- Basic rate limiting for API endpoints
- Secure NGINX defaults and HTTPS redirect

## Repository Layout (Planned)
- `/frontend` — React app
- `/backend` — Node.js API
- `/infra/nginx` — NGINX config
- `/infra/monitoring` — Prometheus + Grafana config
- `/.github/workflows` — CI/CD pipelines
- `/memory-bank` — planning and execution docs

## Why This Stack
- TypeScript improves safety across frontend/backend boundaries
- React + Vite provides fast iteration and modern UX implementation
- Express is lightweight and easy to instrument with Prometheus
- Docker ensures consistent local and production runtime
- GitHub Actions integrates cleanly with Docker-based deploy workflows
- Prometheus/Grafana provides clear operational visibility with low overhead
