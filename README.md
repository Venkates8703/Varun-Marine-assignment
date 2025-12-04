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
