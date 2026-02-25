# Implementation Plan

## Goal
Deliver an MVP Aesthetic Writing App with complete DevOps pipeline and production-grade monitoring.

## Current Phase Status (Updated)
- ✅ Phase 1: Foundation & scaffolding — completed
- ✅ Phase 2: Frontend core UX — completed (evolved to VS Code-like layout + extensions UI)
- ✅ Phase 3: Backend core API — completed
- ✅ Phase 4: Frontend/backend integration — completed
- ✅ Phase 5: CI/CD + deployment hardening — completed
- 🔄 Phase 6: Monitoring hardening — in progress (baseline Prometheus alerts configured)
- 🔄 Phase 7: Final testing/validation — in progress

## Phase 1: Foundation & Project Scaffolding
### Tasks
- Initialize monorepo-style structure:
  - `frontend/`, `backend/`, `infra/`, `.github/workflows/`
- Set up TypeScript configs for frontend and backend
- Add base Dockerfiles for frontend and backend
- Add root `docker-compose.yml` for local development

### Deliverables
- Buildable frontend and backend containers
- Local environment boots with single command

---

## Phase 2: Frontend Features (React)
### Tasks
- Build minimal editor UI with Tailwind
- Implement focus mode toggle
- Add typewriter sound toggle + sound playback on key input
- Implement word counting utility
- Implement export features:
  - Markdown export from editor content
  - Save As flow with user-selected destination (native picker with browser fallback)
- Add VS Code-like layout model:
  - Left activity bar
  - Sidebar actions for extensions/export/import
  - Bottom-left settings affordance
- Add extensions marketplace UI with install/enable/disable controls
- Add screen pets extension overlay runtime

### Deliverables
- Working writing experience with all MVP UX features
- Componentized frontend structure (`Editor`, `Toolbar`, `LeftSidebar`, `ExtensionsMarketplace`)

---

## Phase 3: Backend Features (Node.js)
### Tasks
- Create Express TypeScript API service
- Implement session endpoints:
  - `POST /sessions`
  - `GET /sessions/:id`
  - `PUT /sessions/:id`
- Store session content, word count, goal, timestamps
- Add optional persistence adapters:
  - In-memory (dev fallback)
  - PostgreSQL (durable)
  - Redis (optional fast store)

### Deliverables
- Stable API with validation and error handling
- Persistent session data path (at least one production-capable option)

---

## Phase 4: Integration
### Tasks
- Connect frontend editor autosave to backend session endpoints
- Load/restore latest session state on app startup
- Ensure API URL and env handling per environment
- Add graceful error UI (save failed / retry)
- Add account continuity behavior:
  - Google sign-in integration
  - Account-scoped last draft/session restore
  - Session map persistence per account/guest scope
- Add file import flow for `.txt`/`.md`

### Deliverables
- End-to-end write/save/restore workflow
- Verified content persistence between restarts
- Account-aware restore and import workflow operational

---

## Phase 4.5: Account & Identity Stabilization
### Tasks
- Add frontend env template and local env usage for `VITE_GOOGLE_CLIENT_ID`
- Validate signed-in/signed-out UX and fallback behavior when client ID is missing
- Ensure account controls are placed in VS Code-like left sidebar structure

### Deliverables
- Stable account UX with clear setup requirements
- Identity feature aligned with overall VS Code-style navigation model

---

## Phase 5: CI/CD (GitHub Actions + EC2)
### Tasks
- CI workflow on PR/push:
  - Install dependencies
  - Lint + run tests
  - Build frontend/backend
  - Build Docker images
- CD workflow (main branch or tagged release):
  - Authenticate to container registry
  - Push images
  - SSH deploy to EC2
  - Pull updated images + restart services
- Configure NGINX reverse proxy and HTTPS cert management
- Add deployment environment docs for frontend auth variables (e.g., `VITE_GOOGLE_CLIENT_ID`)

### Deliverables
- Repeatable automated pipeline from commit to deployed service
- Publicly accessible HTTPS endpoint

---

## Phase 6: Monitoring (Prometheus + Grafana)
### Tasks
- Add backend metrics endpoint (`/metrics`)
- Configure Prometheus scrape targets (backend + node exporter optional)
- Build Grafana dashboards:
  - Active users/sessions
  - Request latency (P50/P95/P99)
  - Error rates and uptime
- Add baseline alert rules (high latency, high 5xx, instance down)

### Deliverables
- Functional dashboards with live data
- Basic alerting readiness for production support

---

## Phase 7: Testing & Validation
### Tasks
- Unit tests for word counting, export utilities, and backend services
- Integration tests for session API
- Add frontend behavior tests for:
  - Account-scoped restore logic
  - File import flow
  - Sidebar actions (extensions/export/settings/account)
- Smoke test deployment and HTTPS routing
- Validate monitoring data flow and dashboards
- Run final release checklist

### Deliverables
- Passing CI tests and successful deployment verification
- MVP release candidate

---

## Suggested Timeline (2-3 Weeks)
- Week 1: Phases 1-3
- Week 2: Phases 4-6
- Week 3 (buffer): Phase 7 + hardening

## Dependencies & Prerequisites
- Docker and Docker Compose installed
- AWS EC2 instance + DNS (optional but recommended)
- GitHub repository with Actions enabled
- Container registry credentials (GHCR or Docker Hub)
- TLS certificate strategy (Let's Encrypt or managed cert)

## Risks & Mitigations
- Deployment complexity on EC2
  - Mitigation: scripted deploy + health checks
- Save As browser compatibility differences
  - Mitigation: native file picker when available, download fallback when unavailable
- Metrics overhead
  - Mitigation: keep labels low-cardinality and scrape intervals conservative

## Definition of Done
- Full MVP feature set shipped
- CI/CD pipeline automated and reliable
- HTTPS production deployment live
- Monitoring dashboards and key alerts operational
