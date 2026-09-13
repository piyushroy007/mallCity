# MallCity Linting & Code Quality Standards

This document establishes the mandatory linting, formatting, and coding standards for all code in the MallCity monorepo. Every developer and AI agent must strictly follow these rules.

---

## 1. General Principles

1. **Strict Type Safety**:
   * Never use `any`. Always use explicit TypeScript types, interfaces, or generic parameters.
   * `unknown` should be used only with type narrowing.
   * Avoid non-null assertions (`!`) unless guaranteed by design (prefer optional chaining `?.` and nullish coalescing `??`).
2. **Immutability & Pure Functions**:
   * Prefer `const` over `let`. Never use `var`.
   * Treat states in NgRx and services as immutable. Do not mutate objects or arrays directly (use spread operators, `map`, `filter`).
3. **Naming Conventions**:
   * **Files**: kebab-case with descriptive suffix:
     * Components: `mall-list.component.ts`, `mall-list.component.html`, `mall-list.component.scss`
     * Services: `auth.service.ts`, `city.service.ts`
     * Models/DTOs: `city.model.ts`, `auth.dto.ts`
     * Actions: `city.actions.ts`
     * Reducers: `city.reducer.ts`
     * Effects: `city.effects.ts`
     * Selectors: `city.selectors.ts`
     * Guards: `auth.guard.ts`, `role.guard.ts`
     * Middlewares: `auth.middleware.ts`, `error.middleware.ts`
   * **Classes & Interfaces**: PascalCase (e.g., `MallListComponent`, `CityModel`, `AuthResponseDTO`).
   * **Methods, Functions, Variables**: camelCase (e.g., `fetchCityList`, `isUserLoggedIn`, `mallId`).
   * **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `DEFAULT_PAGE_SIZE`).
   * **NgRx Actions**: Use bracketed source prefix in string type:
     ```typescript
     export const getCityList = createAction('[City API] Get City List');
     export const getCityListSuccess = createAction(
       '[City API] Get City List Success',
       props<{ cities: CityDTO[] }>()
     );
     ```

---

## 2. Formatting Rules (Prettier Standard)

* **Indentation**: 2 spaces (no tabs).
* **Quotes**: Single quotes (`'`) for TypeScript/JavaScript, double quotes (`"`) for HTML/JSON.
* **Line Width**: Max 100 characters per line.
* **Semicolons**: Always include semicolons at the end of statements.
* **Trailing Commas**: ES5 trailing commas in multi-line object and array literals.
* **Whitespace**: No trailing whitespace. Single empty line at the end of files.

---

## 3. TypeScript & Angular Specific Rules

* **Import Ordering**:
  1. Angular core and common packages (`@angular/core`, `@angular/common`, `@angular/router`)
  2. Third-party libraries (`@ngrx/store`, `rxjs`, `@auth0/angular-jwt`)
  3. Shared types/contracts (`@mallcity/shared`)
  4. Core services, guards, interceptors (`src/app/core/...`)
  5. Store artifacts (`src/app/store/...`)
  6. Shared components/directives (`src/app/shared/...`)
  7. Relative imports (`./...`, `../...`)
* **Service Injection**:
  * Prefer `inject()` function over constructor injection in Angular 16+ components and guards:
    ```typescript
    private store = inject(Store);
    private authService = inject(AuthService);
    ```
* **Async Pipe & Subscriptions**:
  * Always prefer the `async` pipe in templates over manual component subscriptions.
  * If a manual subscription is necessary, properly manage lifecycle cleanup using `takeUntilDestroyed()`, `DestroyRef`, or explicit `unsubscribe()` in `ngOnDestroy()`.

---

## 4. Backend (Node/Express) Specific Rules

* **Asynchronous Execution**:
  * Always use `async/await`. Avoid raw callback patterns.
  * Wrap controller endpoints with an async handler utility (`catchAsync`) to avoid unhandled promise rejections.
* **HTTP Error Handling**:
  * Throw typed `ApiError` instances with explicit HTTP status codes (`http-status`).
  * Never leak internal database stack traces in production responses.
* **Logging**:
  * Never use `console.log` in production code. Always use the structured Winston `logger.info`, `logger.warn`, or `logger.error`.

---

## 5. Verification Commands

* Run full lint check across the monorepo:
  ```bash
  npm run lint
  ```
* Format code with Prettier:
  ```bash
  npm run format
  ```
