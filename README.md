# Varun-Marine-assignment
# FuelEU Maritime — Full-Stack Assignment (Minimal Implementation)

Repository contains two folders:
- `/frontend` — React + TypeScript + Tailwind dashboard
- `/backend` — Node.js + TypeScript + Express + Prisma (PostgreSQL)

## Overview
This implements a minimal Fuel EU compliance platform:
- Routes listing & baseline selection
- Compare (baseline vs others) with compliance check
- Banking (Article 20) endpoints & UI
- Pooling (Article 21) greedy allocation & UI
- Hexagonal architecture with separation of core, ports, adapters
- AI agent usage documented in `AGENT_WORKFLOW.md`

## Quick start (local)

### Backend
1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres DB:
2. Install:
3. Generate Prisma client, migrate and seed:
4. Start server:
Server will run at `http://localhost:4000`.

### Frontend
1. Install:
2. Start:
Frontend runs at `http://localhost:5173` (Vite default).

## Tests
- Backend unit tests:

## Architecture notes
- `core/` folders contain domain logic & use-cases (no framework imports).
- `adapters/` contain inbound (HTTP) and outbound (Prisma) code.
- Frontend `core` has domain-only helpers; `adapters/ui` contains React components.

## Seed data (routes included)
Five routes are seeded (R001-R005) as per brief (one baseline set).

## Files of interest
- `backend/src/core/application/computeCB.ts` — CB formula and snapshot creation
- `backend/src/adapters/inbound/http/routesController.ts` — REST endpoints
- `frontend/src/src/adapters/ui/components/RoutesTab.tsx` — routes table + Set Baseline
- `AGENT_WORKFLOW.md`, `REFLECTION.md` — agent documentation & reflections

---

Please run the backend first (`http://localhost:4000`) and then start the frontend. If you prefer dockerized DB or CI, I can add docker-compose and GitHub Actions next.
