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
- Add HTTPS-ready production NGINX config (cert paths + redirect 80->443)
- Add Prisma migrations and seed workflow for PostgreSQL path
- Add request-level auth/session strategy if multi-user support is needed
- Add richer frontend integration tests for autosave and export UX

## Notes
- Implementation is intentionally modular to avoid a monolith.
- Milestone-level commits are being applied on the active feature branch.

## Update - 2026-02-25 (UI + Formatting)
- Upgraded frontend visuals for a more appealing look while keeping the minimal writing UX.
- Added toolbar `Bold` option for markdown-style emphasis (`**selected text**`).
- Added cursor-aware insertion when no text is selected (inserts `****` and places cursor in the middle).
- Validation: frontend build passes after the update.

## Update - 2026-02-25 (Visual Tone Refinement)
- Updated app description text to: `Vscode, but for writing.`
- Redesigned `VsWrite` header logo mark for a cleaner, more premium look.
- Reduced childish visual tone by replacing high-saturation playful styles with calmer professional styling.
- Preserved typewriter sound, bold formatting, and responsive top/bottom toolbar layout.

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

