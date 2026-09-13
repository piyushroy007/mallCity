# MallCity Project Memory & Activity Log

This document serves as the persistent memory for the MallCity project. It records chronological milestones, decisions, task completions, and context so any future developer or agent understands the complete project lineage and never loses context.

---

## Project Inception & Timeline

### [Phase 0] Repository Analysis & Specification Extraction
* **Date**: September 13, 2026
* **Actor**: Antigravity Assistant & Piyush Roy
* **Activity**:
  * Thoroughly audited the legacy and predecessor implementations (`Malls-City`, `mallCity2.2`, and `mallCity`).
  * Extracted complete catalog of 5 main pages, 17 API endpoints, Mongoose models, and NgRx store architecture.
  * Generated `mallcity_full_architecture_and_feature_spec.md` as the master reference.

### [Phase 1] Architecture Alignment & Decision Finalization
* **Date**: September 13, 2026
* **Actor**: Piyush Roy & Antigravity Assistant
* **Key Decisions**:
  1. Frontend: Angular with **NgRx everywhere** (universal state management) + **Angular Material**.
  2. Backend: **100% strict TypeScript** with Express + MongoDB & Mongoose.
  3. Security: Explicit **Role-Based Access Control (RBAC)** (`role: 'admin' | 'user'`).
  4. Repository: **Unified Monorepo** (`apps/web`, `apps/api`, `packages/shared`).
  5. Governance files mandated: `memory.md`, `architecture.md`, `doc.md`, `style.md`, `linting.md`.

### [Phase 2] Monorepo Initialization & Governance Scaffolding
* **Date**: September 13, 2026
* **Actor**: Antigravity Assistant
* **Activity**:
  * Created core governance files:
    * `architecture.md`: Visual architecture and directory maps.
    * `doc.md`: Architectural Decision Records (ADRs).
    * `memory.md`: Chronological log and persistent knowledge base.
    * `style.md`: Strict UI/UX design tokens and styling constraints.
    * `linting.md`: Linting standards and code quality instructions.
  * Established monorepo root configurations (`package.json`, `tsconfig.base.json`).

### [Phase 3] Unified Monorepo Implementation & Build Verification
* **Date**: September 13, 2026
* **Actor**: Antigravity Assistant
* **Activity**:
  * Implemented `@mallcity/shared` workspace with typed DTOs and contracts (`UserDTO`, `CityDTO`, `MallDTO`, `ShopDTO`, `UserRole`).
  * Implemented `@mallcity/api` in 100% strict TypeScript:
    * Mongoose models (`User` with bcrypt pre-save hashing & `role`, `City` with indexed `cityCode`, `Mall`, `Shop`).
    * Full CRUD endpoints with Joi validation middlewares.
    * Role-Based Access Control (`verifyToken`, `requireRole('admin')`).
    * Daily rotated Winston logger + Morgan integration.
    * Admin seeder (`npm run seed:admin`) and index sync (`npm run sync:indexes`).
  * Implemented `@mallcity/web` in Angular with NgRx & Angular Material:
    * Reusable shell components (`HeaderComponent` with role badges & conditional admin access, `FooterComponent`, `CardComponent`).
    * Directives (`HighlightsColorDirective`, `RepeatitemsDirective`).
    * NgRx store with Actions, Reducers, Effects, Selectors, and Logger Meta-reducer for Cities, Malls, Shops, and Auth.
    * Public discovery pages: Home (city dropdown selector), Malls list (grid with detail/like/share actions), Shops list (compound floor & category filter engine).
    * Auth page: Dual-mode Login / Sign Up with reactive forms & password match validator.
    * Admin console: Split-pane City management (CRUD + validation), Mall registration (image upload preview & cascading state/city selectors), Shop registration.
    * Route guards: `AuthGuard` and `RoleGuard(['admin'])`.
  * Verified full monorepo build: `npm run build` cleanly compiled both `@mallcity/api` and `@mallcity/web` with zero errors.

### [Phase 4] Documentation & Quick Start Orchestration Alignment
* **Date**: September 13, 2026
* **Actor**: Antigravity Assistant
* **Activity**:
  * Upgraded [README.md](file:///c:/MyData/Proj/mallCity/README.md) to a comprehensive project guide including monorepo layout, environment configuration, credentials, and developer Quick Start commands.
  * Synchronized [doc.md](file:///c:/MyData/Proj/mallCity/doc.md) with an Operational Runbook section linking to the canonical root `README.md`.

### [Phase 5] Remote GitHub Repository Synchronization
* **Date**: September 14, 2026
* **Actor**: Antigravity Assistant & Piyush Roy
* **Activity**:
  * Verified git credentials and confirmed safety of `.gitignore` (safeguarding `.env`, `logs/`, `dist/`, and `node_modules/`).
  * Staged 153 repository files across `apps/api`, `apps/web`, `packages/shared`, and root governance specifications.
  * Created commit `e80d66d` ("feat: rebuild MallCity into Angular NgRx monorepo with strict TypeScript API, RBAC, and governance docs").
  * Pushed cleanly to remote repository `origin master` (`https://github.com/piyushroy007/mallCity.git`).

---

## Incremental Feature Roadmap & Progress

- [x] Comprehensive repo analysis & architecture documentation
- [x] Governance & guideline documents (`memory.md`, `architecture.md`, `doc.md`, `style.md`, `linting.md`)
- [x] Root monorepo workspace configuration (`apps/*`, `packages/*`)
- [x] `packages/shared`: Common DTOs, interfaces, and role contracts
- [x] `apps/api`: TypeScript backend with Mongoose, Auth/RBAC, and full CRUD
- [x] `apps/web`: Angular frontend with NgRx store, Angular Material, and RBAC guards
- [x] Public discovery pages: Home (City selection), Malls list, Shops list (Compound filter)
- [x] Admin dashboard: City management (CRUD + validation), Mall management (Uploads), Shop management
- [x] Role-based access control: Admin vs User permissions enforced across frontend & backend
- [x] Verification and end-to-end build testing (`npm run build`)
- [x] Quick Start commands synchronized in `README.md` and `doc.md`
- [x] Synchronized and pushed to GitHub repository (`origin/master`)

---

*Note for Agents and Contributors: When you implement or modify any feature or make any architectural change, append your entry to this `memory.md` file following the established format.*
