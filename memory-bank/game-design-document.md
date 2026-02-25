# Game Design Document (GDD)

## Project Name
Aesthetic Writing App with DevOps

## Vision
Create a minimal, distraction-free writing experience that helps users maintain flow through clean UI, optional typewriter audio feedback, and lightweight progress mechanics.

## Primary Objective
Build a writing app that supports focused drafting while providing practical output/export and reliable cloud deployment with observability.

## Core User Experience
- Fast startup and zero-friction writing
- Minimal interface with optional controls
- Focus mode to remove visual distractions
- Soft typewriter sound feedback while typing
- Daily/session word goal with progress indicator
- Easy export to Markdown and PDF

## Target Users
- Students and researchers writing essays and notes
- Novelists/bloggers drafting long-form content
- Developers and knowledge workers writing documentation
- Users who prefer plain, calm writing interfaces

## User Stories
1. As a writer, I want a clean editor so I can focus only on words.
2. As a writer, I want to toggle focus mode so I can hide non-essential UI.
3. As a writer, I want subtle typewriter sounds while typing so writing feels tactile.
4. As a writer, I want to set a word goal and track progress so I stay accountable.
5. As a writer, I want to export in Markdown or PDF so I can publish/share content.
6. As a returning user, I want session state saved so I can continue where I left off.

## Functional Requirements
### Frontend
- Text editor surface with autosave trigger
- Focus mode toggle (hide header/toolbars except essentials)
- Typewriter sound toggle and volume control (optional minimal slider)
- Word count + goal progress bar
- Export controls:
  - Export current document as `.md`
  - Export current document as `.pdf`

### Backend
- Session API for creating/updating/retrieving writing sessions
- Persist content, current word count, and goal
- Optional data store integration:
  - PostgreSQL for durable structured persistence
  - Redis for session caching/ephemeral storage

### DevOps & Platform
- Dockerized frontend and backend services
- CI/CD workflow via GitHub Actions
- Deployment to AWS EC2 (or equivalent VM)
- NGINX reverse proxy + HTTPS termination
- Prometheus + Grafana monitoring dashboards:
  - Active users
  - Request latency
  - Server health/uptime

## Non-Functional Requirements
- Responsive UI for desktop-first and tablet usage
- Performance: editor interactions remain smooth under long text documents
- Reliability: backend API availability and graceful restart handling
- Security: HTTPS-only in production, basic hardening and secret handling
- Maintainability: modular TypeScript code and clear project structure

## UX Principles
- Minimalism first: reduce chrome and avoid visual noise
- Progressive disclosure: show controls only when needed
- Flow preservation: avoid disruptive modals/interruptions
- Accessibility baseline: sufficient contrast, keyboard usability, readable typography

## Scope
### In Scope (MVP)
- Single-user writing sessions
- Focus mode, typewriter sound, word goal tracker, export options
- Session persistence through backend API
- Dockerized deployment and CI/CD to VM
- Monitoring stack with baseline dashboards

### Out of Scope (MVP)
- Real-time collaboration
- Full document library/search system
- Rich text formatting suite
- Authentication/role management (optional future phase)

## Success Metrics
- Time to first write < 3 seconds on warm load
- Session save success rate > 99%
- P95 API latency target < 300 ms under normal load
- Crash-free session rate > 99.5%
- User can complete export in <= 2 clicks

## Risk Register (High-Level)
- PDF export consistency across environments
- Sound playback differences across browsers/autoplay policies
- EC2 deployment drift without infrastructure-as-code
- Monitoring cardinality explosion if metrics labels are poorly designed

## Milestones
1. Project scaffolding + Docker baseline
2. Frontend MVP features
3. Backend persistence API
4. Frontend-backend integration
5. CI/CD and cloud deployment
6. Monitoring and observability
7. Validation and release checklist

## Definition of Done (MVP)
- All core writing features operational
- Data persists and restores correctly
- CI pipeline passes (tests + builds)
- Deployment accessible via HTTPS domain/IP
- Dashboards show app and infrastructure health
