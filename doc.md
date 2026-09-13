# MallCity Architectural Decision Records (ADRs)

This document details the architectural decisions taken for the MallCity project, including context, options considered, and rationales.

---

## ADR 001: Monorepo Architecture using npm Workspaces

* **Status**: Accepted
* **Context**: The previous architecture separated backend and frontend in fragmented subfolders, causing code duplication (especially DTOs/interfaces) and independent build management overhead.
* **Decision**: Adopt a unified monorepo structure utilizing native npm workspaces (`workspaces: ["apps/*", "packages/*"]`).
* **Consequences**:
  * Shared types can be maintained in `packages/shared` and imported cleanly.
  * Centralized build, lint, and run scripts at the monorepo root.
  * Lightweight tooling without relying on heavy external monorepo orchestrators.

---

## ADR 002: State Management with NgRx Everywhere

* **Status**: Accepted
* **Context**: The application handles dynamic filtering, multi-step admin workflows, city indexing, and authentication sessions.
* **Decision**: Use NgRx (Actions, Effects, Reducers, and Selectors) universally across all feature modules.
* **Consequences**:
  * Unidirectional data flow and strict immutability.
  * Side effects (HTTP communication, notifications) isolated in Effects.
  * Predictable, replayable state changes with easy debugging using meta-reducers.

---

## ADR 003: Strict TypeScript for 100% of Backend Code

* **Status**: Accepted
* **Context**: The predecessor codebase had TypeScript models and routes but JavaScript controllers, creating typing friction and runtime vulnerability.
* **Decision**: All backend code in `apps/api` is written in 100% strict TypeScript (`strict: true`, `noImplicitAny: true`).
* **Consequences**:
  * End-to-end type safety between controllers, services, models, and shared DTOs.
  * Compile-time guarantees for request bodies and response formats.

---

## ADR 004: Database Engine — MongoDB with Mongoose

* **Status**: Accepted
* **Context**: Flexible schema requirements for shops (varied attributes, floor levels, categories) and mall structures.
* **Decision**: Use MongoDB with Mongoose ODM as the primary data store.
* **Consequences**:
  * Rich document model with pre-save hooks (e.g., Bcrypt password hashing).
  * Automated index synchronization using safe migration scripts (`sync:indexes`).
  * Explicit schema definitions with virtuals and timestamps.

---

## ADR 005: Role-Based Access Control (RBAC) with JWT

* **Status**: Accepted
* **Context**: Only authorized administrative users should have write access (create/update cities, malls, and shops) and access the admin dashboard.
* **Decision**:
  * Users are assigned a `role` (`'admin' | 'user'`).
  * JWT payload includes `{ userId, email, role }`.
  * Backend: Enforce access through `requireRole('admin')` middleware on mutating routes.
  * Frontend: Enforce navigation restriction through `RoleGuard` and conditional UI rendering in headers/actions.
* **Consequences**:
  * Tamper-proof, stateless permission enforcement.
  * Clear security boundary separating public consumer exploration from back-office management.

---

## ADR 006: Component Library & Design System

* **Status**: Accepted
* **Context**: Need a cohesive, accessible UI supporting custom branding, glassmorphism, and responsive grids.
* **Decision**: Use Angular Material as the foundational component library, complemented by custom SCSS tokens (Inter font, 4px scale, 8px radius, mint/indigo color palette).
* **Consequences**:
  * High accessibility (ARIA) and battle-tested components (tables, paginators, menus, tabs, inputs).
  * Consistent brand styling aligned with `style.md`.

---

## Operational Runbook & Quick Start Commands

While this document primarily tracks Architectural Decision Records (ADRs), the day-to-day commands to start and build the unified monorepo are documented below for convenience:

```bash
# 1. Start Backend Dev Server (Port 5000)
npm run dev:api

# 2. Seed Default Administrator Account (admin@mallcity.com / Admin@123456)
npm run seed:admin

# 3. Start Frontend Dev Server (Port 4200)
npm run dev:web

# 4. Compile Entire Monorepo for Production
npm run build
```

> **Operational Note**: For detailed environment variable configuration, prerequisites, and development workflows, refer to the root [README.md](file:///c:/MyData/Proj/mallCity/README.md) as the single source of truth for repository onboarding.
