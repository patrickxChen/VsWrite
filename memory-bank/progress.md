# Progress Tracker

## Date
2026-02-25

## Completed
- Created full-stack modular project structure (`frontend`, `backend`, `infra`, `.github/workflows`)
- Implemented React frontend MVP:
	- Minimal writing UI
	- Focus mode toggle
	- Typewriter sound toggle
	- Word goal tracker
	- Export to Markdown and PDF
- Implemented Node.js backend MVP:
	- Session CRUD endpoints (`POST/GET/PUT`)
	- Validation with Zod
	- Pluggable stores (`memory`, `postgres`, `redis`)
	- Prometheus metrics endpoint and instrumentation
- Added Docker setup:
	- `frontend/Dockerfile`
	- `backend/Dockerfile`
	- root `docker-compose.yml`
- Added infrastructure configs:
	- NGINX reverse proxy
	- Prometheus scrape config
	- Grafana datasource + dashboard provisioning
- Added GitHub Actions:
	- CI workflow for tests/builds/images
	- CD workflow for image push + EC2 deploy via SSH
- Updated root README with setup, Docker, CI/CD, and monitoring guidance

## Validation Status
- Frontend tests: passing
- Backend tests: passing
- Frontend build: passing
- Backend build: passing

## Next Steps
- Add baseline alert rules and operational runbook checks for monitoring hardening
- Add Prisma migrations and seed workflow for PostgreSQL path
- Add request-level auth/session strategy if multi-user support is needed
- Add richer frontend integration tests for account/import/sidebar flows

## Notes
- Implementation is intentionally modular to avoid a monolith.
- Milestone-level commits are being applied on the active feature branch.

## Update - 2026-02-25 (UI + Formatting)
- Upgraded frontend visuals for a more appealing look while keeping the minimal writing UX.
- Validation: frontend build passes after the update.

## Update - 2026-02-25 (Visual Tone Refinement)
- Updated app description text to: `Vscode, but for writing.`
- Redesigned `VsWrite` header logo mark for a cleaner, more premium look.
- Reduced childish visual tone by replacing high-saturation playful styles with calmer professional styling.
- Preserved typewriter sound and responsive top/bottom toolbar layout.

## Update - 2026-02-25 (Theme System + Layout)
- Removed goal tracker panel from the active frontend UI.
- Added VS Code-like theme selection (`Dark+`, `Light+`, `Monokai`, `Quiet Light`) with persistence.
- Moved export actions to the top header area.
- Updated styling to use theme tokens across header, toolbar, editor, buttons, and status strip.

## Update - 2026-02-25 (Extensions Marketplace + Pets)
- Added an extensions marketplace panel inspired by VS Code.
- Added first extension: `Screen Pets` with install/enable/disable/uninstall actions.
- Added animated pet overlay runtime when extension is enabled.
- Persisted extension install and enable state in local storage.

## Update - 2026-02-25 (VS Code Sidebar + Sprite Pets)
- Moved `Extensions` and export controls to a VS Code-like left sidebar.
- Added responsive left sidebar adaptation for narrower screens.
- Upgraded pets extension visuals to sprite-like pets with idle animations.
- Repositioned pets to lay on top of the writing board rather than roaming across the full app screen.

## Update - 2026-02-25 (Sidebar/Icon + Pet Motion Refinement)
- Refined top-left sidebar actions into icon-only, vertically aligned controls.
- Replaced emoji-like symbols with VS Code-style SVG-inspired icons.
- Rebuilt pets into full-body sprites with visible ears/body/legs/tail.
- Added movement across the writing board with continuous motion loops.

## Update - 2026-02-25 (Docked Sidebar Behavior Fix)
- Fixed responsive behavior that could collapse the sidebar to top layout on narrower screens.
- Sidebar is now persistently docked on the left and visible independent of focus mode.

## Update - 2026-02-25 (Theme in Bottom-Left Settings)
- Moved theme controls out of the top area.
- Added a bottom-left sidebar `Settings` gear icon.
- Implemented a settings popover containing the theme selector, aligned with VS Code-like placement.

## Update - 2026-02-25 (Accounts + Last Draft + Import)
- Added Google sign-in account UI.
- Added account-scoped last session/draft restore so users return to their latest writing state.
- Added file import action (`.txt`, `.md`) from the left sidebar.

## Update - 2026-02-25 (Bottom-Left Account Icon + Env Setup)
- Moved account access to a dedicated sidebar account icon above settings.
- Added account popover at the bottom-left sidebar region.
- Added `frontend/.env.example` and local `frontend/.env.local` with `VITE_GOOGLE_CLIENT_ID` key.

## Update - 2026-02-25 (Phase 5 Deployment Hardening)
- Added `docker-compose.prod.yml` for image-based production deployment.
- Added HTTPS NGINX config at `infra/nginx/nginx.prod.conf` with `80 -> 443` redirect.
- Added production env template at `.env.prod.example`.
- Hardened CD workflow to pass frontend auth build args and run post-deploy `/health` checks.
- Updated deployment docs in `README.md` with production rollout commands.

## Update - 2026-02-25 (Phase 6 Monitoring Hardening)
- Added Prometheus alert rules in `infra/monitoring/alerts.yml`.
- Added alert rule loading in `infra/monitoring/prometheus.yml`.
- Mounted alerts config in both `docker-compose.yml` and `docker-compose.prod.yml`.
- Added monitoring verification guidance and alert inventory in `README.md`.

