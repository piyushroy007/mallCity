# MallCity Architecture

## 1. Monorepo Structure

MallCity is structured as a unified monorepo using npm workspaces:

```
mallCity/
├── memory.md                        # Incremental project activity and historical log
├── architecture.md                  # System architecture and directory map
├── doc.md                           # Architectural Decision Records (ADRs)
├── style.md                         # UI/UX design tokens and styling rules
├── linting.md                       # Coding standards and linting rules
├── package.json                     # Monorepo root workspaces and build scripts
├── tsconfig.base.json               # Root TypeScript configuration
│
├── apps/
│   ├── api/                         # Backend (TypeScript + Express + Mongoose)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── .env.example
│   │   ├── src/
│   │   │   ├── configs/             # Database connection, env validation, Winston logger
│   │   │   ├── models/              # Mongoose models: User, City, Mall, Shop
│   │   │   ├── controllers/         # Typed request controllers
│   │   │   ├── routers/             # Express routes (/city, /mall, /shop, /auth, /logs, /health)
│   │   │   ├── middlewares/         # verifyToken, verifyRole, errorHandler, validate
│   │   │   ├── validators/          # Validation schemas
│   │   │   ├── scripts/             # Index sync, index restore, admin seeder
│   │   │   ├── app.ts               # Express configuration, CORS, Helmet, Morgan
│   │   │   └── server.ts            # Entrypoint, HTTP server listener
│   │   └── uploads/                 # Stored images for malls and shops
│   │
│   └── web/                         # Frontend (Angular + NgRx + Angular Material)
│       ├── package.json
│       ├── angular.json
│       ├── tsconfig.json
│       └── src/
│           ├── app/
│           │   ├── core/            # Auth services, guards (AuthGuard, RoleGuard), interceptors
│           │   ├── shared/          # Header, Footer, Reusable Card, Directives
│           │   ├── store/           # NgRx store: Actions, Reducers, Effects, Selectors
│           │   ├── features/
│           │   │   ├── home/        # Landing & city selector
│           │   │   ├── malls/       # Mall catalog
│           │   │   ├── shops/       # Shop directory with Floor & Category filtering
│           │   │   ├── auth/        # Login & Signup dual interface
│           │   │   └── admin/       # Admin console (City CRUD, Add Mall, Add Shop)
│           │   ├── app.component.ts
│           │   └── app.routes.ts
│           └── assets/              # Icons, city dataset, mock images
│
└── packages/
    └── shared/                      # Common TypeScript interfaces & DTOs
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── models/              # CityDTO, MallDTO, ShopDTO, UserDTO
            ├── auth/                # AuthPayload, UserRole ('admin' | 'user')
            └── index.ts
```

## 2. High-Level Data Flow

```
[ Angular Frontend (apps/web) ]
              │
              │  HTTP Requests with JWT Bearer Token
              ▼
[ Express REST API (apps/api) ]
              │
              ├─► Helmet & CORS Middlewares
              ├─► Morgan / Winston HTTP Logger
              ├─► Auth Middleware (JWT validation + Role verification)
              ├─► Request Validation Middleware
              ├─► Controller Logic
              │
              ▼
[ Mongoose ODM / Models ]
              │
              ▼
[ MongoDB Database ]
```

## 3. Security Architecture (RBAC)

* **Roles**: `'admin'` and `'user'`.
* **Token Payload**: Contains `userId`, `email`, and `role`.
* **Backend Enforcement**:
  * Read endpoints (`GET /api/v1/city`, `GET /api/v1/mall`, `GET /api/v1/shop`) are public.
  * Mutating endpoints (`POST`, `PUT`, `DELETE`) require `verifyToken` AND `requireRole('admin')`.
* **Frontend Enforcement**:
  * `AuthGuard`: Checks token presence and validity.
  * `RoleGuard`: Validates `user.role === 'admin'`. Unauthorized users are blocked from `/admin`.
  * Navigation items (e.g., Admin panel entry) conditionally render based on user authentication state and role.
