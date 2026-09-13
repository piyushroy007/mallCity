# MallCity — Modern Monorepo Application

A full-stack, enterprise-ready web platform for exploring and managing shopping malls, retail shops, and cities worldwide. Rebuilt from the ground up as a high-performance monorepo utilizing modern Angular with universal NgRx state management, Angular Material, 100% strict TypeScript Express API, MongoDB with Mongoose, and Role-Based Access Control (RBAC).

---

## Key Highlights & Architecture

* **Universal NgRx Store**: Predictable, immutable, and reactive state management across all feature domains (Cities, Malls, Shops, and Auth) with meta-reducer logging.
* **100% Strict TypeScript Backend**: Pure TypeScript across Express controllers, models, routes, and services with zero `any` types.
* **Role-Based Access Control (RBAC)**: Secure separation between public exploration (`role: 'user'`) and administrative management (`role: 'admin'`), enforced via JWT verification, server-side route guards, and Angular route guards.
* **Shared DTO Contracts**: Shared TypeScript interfaces, types, and DTOs in `@mallcity/shared` consumed across both backend and frontend.
* **Angular Material & Responsive UI**: Clean, accessible component design compliant with WCAG standards and custom design tokens (Inter font, 4px scale, 8px radius).

---

## Monorepo Workspace Structure

```
mallCity/
├── apps/
│   ├── api/                 # Express backend in 100% strict TypeScript
│   │   ├── src/
│   │   │   ├── configs/     # Database and environment configurations
│   │   │   ├── controllers/ # City, Mall, Shop, and User controllers
│   │   │   ├── middlewares/ # JWT auth, RBAC (requireRole), upload, errors
│   │   │   ├── models/      # Mongoose schemas (City, Mall, Shop, User)
│   │   │   ├── routes/      # Versioned REST endpoints (/api/v1/*)
│   │   │   └── scripts/     # Admin seeder and index synchronizer
│   │   └── tsconfig.json
│   └── web/                 # Angular 16+ frontend with NgRx & Angular Material
│       ├── src/app/
│       │   ├── components/  # Shell headers, footers, and card components
│       │   ├── guards/      # AuthGuard & RoleGuard (admin enforcement)
│       │   ├── pages/       # Home, MallList, ShopList, Login, Admin
│       │   ├── services/    # REST API client services
│       │   └── store/       # Universal NgRx Actions, Reducers, Effects, Selectors
│       └── tsconfig.json
├── packages/
│   └── shared/              # Shared DTOs, contracts, and interfaces
│       └── src/
│           ├── dtos/        # CityDTO, MallDTO, ShopDTO, UserDTO, AuthDTO
│           └── index.ts
├── architecture.md          # Architectural visual maps and directory guides
├── doc.md                   # Architectural Decision Records (ADRs)
├── memory.md                # Persistent chronological project activity log
├── style.md                 # UI/UX design tokens and styling guidelines
├── linting.md               # Code quality, linting, and formatting standards
└── package.json             # Root npm workspace orchestration
```

---

## Quick Start Commands

Run these commands from the root directory of the monorepo:

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

---

## Additional Monorepo Commands

| Command | Description |
| :--- | :--- |
| `npm run dev:api` | Starts the Express backend in development mode with `ts-node-dev` on port `5000`. |
| `npm run dev:web` | Starts the Angular frontend development server on port `4200`. |
| `npm run seed:admin` | Seeds the default administrator credentials into the database. |
| `npm run sync:indexes` | Synchronizes and builds all Mongoose database indexes safely. |
| `npm run build` | Compiles the shared package, backend (`dist/`), and frontend for production (`dist/web`). |
| `npm run format` | Runs Prettier across the entire codebase. |

---

## Default Credentials

The admin seed command creates the default administrative user for testing back-office operations:

* **Email**: `admin@mallcity.com`
* **Password**: `Admin@123456`
* **Role**: `admin`

---

## Environment Configuration

The backend runs with sensible defaults out of the box. To override them, create a `.env` file in the root or in `apps/api/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:4200
MONGO_URI=mongodb://localhost:27017/mallcity
JWT_SECRET=supersecret_jwt_key_mallcity_2026
JWT_EXPIRES_IN=1h
ADMIN_NAME="Super Admin"
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@mallcity.com
ADMIN_PASSWORD=Admin@123456
```

---

## Project Documentation & Governance

To maintain architectural integrity, all design choices and milestones are recorded in dedicated repository documents:

* [architecture.md](file:///c:/MyData/Proj/mallCity/architecture.md) — High-level architecture, module flow diagrams, and directory hierarchy.
* [doc.md](file:///c:/MyData/Proj/mallCity/doc.md) — Architectural Decision Records (ADR 001 to ADR 006) detailing technical rationales.
* [memory.md](file:///c:/MyData/Proj/mallCity/memory.md) — Chronological activity logs, completed milestones, and persistent context.
* [style.md](file:///c:/MyData/Proj/mallCity/style.md) — Design system rules, color tokens, typography, and layout specifications.
* [linting.md](file:///c:/MyData/Proj/mallCity/linting.md) — Code formatting, lint rules, and build validation standards.
