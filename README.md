# React Vite Boilerplate

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**React Vite Boilerplate** is a production-ready starting point for building single-page applications with React, TypeScript, and Vite. It is not a UI kit or a framework — it is the foundation you clone once and stop rebuilding from scratch on every new project.

**The problem it solves:** every React + TypeScript project starts with the same repetitive decisions — how to structure folders, how to wire up routing, where to put types, how to handle shared state without reaching for Redux, how to set up linting and formatting so they actually block bad code before it reaches the repo. This boilerplate answers all of those decisions upfront, with a consistent, lightweight architecture that scales to real applications without introducing unnecessary complexity.

**What it includes:**

- **Vite 7** as the build tool — instant dev server startup, fast HMR, and optimized production builds out of the box.
- **React 19 + TypeScript 5** — strict typing enforced throughout; no `any`, explicit return types required, consistent type imports.
- **React Router v7** with `HashRouter` for static-hosting compatibility. Includes a `PublicRoute` layout wrapper ready to be extended with authentication or role-based guards, and a configurable 404 / redirect behavior driven by an environment variable.
- **Context + Provider + custom hook pattern** for shared state — demonstrated with a counter feature that shows how to scope a provider to a specific route, enforce provider usage at the type level, and expose a clean hook API without prop-drilling.
- **Service layer** — plain async modules that wrap `fetch`, throw typed errors on non-ok responses, and keep all API communication out of components.
- **Centralized type system** — all TypeScript interfaces live in `src/types/`, split by concern (props, states, contexts, hooks, domain models, env variables). Environment variables are parsed and typed once in `src/constants/envs.ts`; raw `import.meta.env` access does not spread across the codebase.
- **Semantic HTML and accessibility** — components use `<article>`, `<address>`, `<nav>`, `<output aria-live>`, `role="status"`, `role="alert"`, and `rel="noopener noreferrer"` by default, not as an afterthought.
- **Jest 30 + Testing Library + MSW** — full test suite with `ts-jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/user-event`, and MSW v2 for network-level HTTP mocking. Tests mirror the `src/` structure, use a typed `renderComponent` / `renderPage` factory pattern, and cover happy paths, edge cases, async flows, and error states. Coverage threshold enforced at 70% across branches, functions, lines, and statements.
- **ESLint + Prettier + Husky + lint-staged** — pre-commit hooks block commits with linting errors and auto-format staged files. No manual formatting steps required.

**How to use it:**

1. Clone the repository and install dependencies.
2. Rename the project in `package.json` and update the HTML title in `index.html`.
3. Set your environment variables following `.env.example`.
4. Replace the template pages, components, services, and context with your own domain logic — the folder structure, routing setup, type conventions, and tooling stay exactly as they are.
5. Replace placeholder values before deploying:
   - `your-site.com` → your real domain in `public/robots.txt` (sitemap URL) and `index.html` (`og:url`)
   - `@your-user` → your Twitter/X handle in `index.html` (`twitter:creator`)
   - `Diego Libonati` → your name in `index.html` (`<meta name="author">`)
   - `start_url` in `public/manifest.json` → your app's base path if not `/`

## Technologies Used

1. React JS
2. TypeScript
3. Vite
4. HTML5
5. CSS3
6. Docker
7. Nginx

## Libraries Used

### Dependencies

```
"react": "^19.2.4"
"react-dom": "^19.2.4"
"react-router": "7.16.0"
```

### DevDependencies

```
"@eslint/js": "^9.0.0"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/react": "^16.0.1"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"@types/react": "^19.2.14"
"@types/react-dom": "^19.2.3"
"@vitejs/plugin-react": "^5.0.2"
"eslint": "^9.0.0"
"eslint-config-prettier": "^9.0.0"
"eslint-plugin-prettier": "^5.5.5"
"eslint-plugin-react-hooks": "^5.0.0"
"eslint-plugin-react-refresh": "^0.4.0"
"globals": "^15.0.0"
"husky": "^9.0.0"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^15.0.0"
"msw": "^2.10.4"
"prettier": "^3.0.0"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.0.0"
"undici": "^7.25.0"
"vite": "^7.1.6"
```

## Getting Started

With the stack and dependencies in mind, set up the project locally:

1. Clone the repository.
2. Navigate to the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy the example env file and adjust values for your environment (see [Env Keys](#env-keys) for the available variables):

   ```bash
   cp .env.example .env
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

The application will open automatically at `http://localhost:3000`.

### Pre-Commit for Development

Before committing, the project enforces code quality through pre-commit hooks. Husky runs `lint-staged` on every commit, which executes ESLint on staged `.ts`/`.tsx` files and Prettier on `.ts`, `.tsx`, `.css`, `.json` and `.md` files. Commits with linting errors are blocked.

After `npm install`, the `prepare` script automatically runs `husky` to install the Git hooks in `.husky/`. If hooks are not active after a fresh clone, run `npm run prepare` manually.

**ESLint** is configured with TypeScript strict rules:

- Explicit return types required
- No `any` type allowed
- Consistent type imports
- No unused variables

**Prettier** enforces consistent formatting:

- 2 spaces indentation
- Semicolons required
- Double quotes
- Trailing commas (ES5)

You can also run the tools manually outside of the commit flow:

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run lint`         | Check for linting errors      |
| `npm run lint:fix`     | Fix linting errors            |
| `npm run lint:all`     | Fix linting all (src + tests) |
| `npm run format`       | Format code with Prettier     |
| `npm run format:check` | Check code formatting         |
| `npm run format:all`   | Format Prettier (src + tests) |

## Env Keys

Environment variables are parsed and typed once in `src/constants/envs.ts`; raw `import.meta.env` access is not allowed elsewhere in the codebase.

| Key                                 | Description                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------- |
| `VITE_REDIRECT_IF_ROUTE_NOT_EXISTS` | If `true`, redirects to home when route doesn't exist. If `false`, shows 404 page. |
| `VITE_TEMPLATE_API_URL`             | Users API URL.                                                                     |

Example `.env`:

```bash
VITE_REDIRECT_IF_ROUTE_NOT_EXISTS=false
VITE_TEMPLATE_API_URL=https://jsonplaceholder.typicode.com
```

## Project Structure

With the app running and configured, here is how the source is organized:

```
react-vite-boilerplate/
├── __tests__/                      # Test suite
│   ├── __mocks__/                  # Shared mock data and module mocks
│   ├── components/                 # Tests for reusable components
│   ├── constants/                  # Tests for constants
│   ├── helpers/                    # Tests for helper functions
│   ├── pages/                      # Tests for page components
│   ├── services/                   # Tests for service modules
│   ├── jest.setup.ts               # Jest global setup (jest-dom matchers, MSW lifecycle)
│   ├── jest.polyfills.ts           # Node Web API polyfills required by MSW
│   └── jest.polyfills-undici.ts    # fetch/Request/Response polyfills via undici for MSW
├── public/                         # Static assets served as-is
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/                     # Images, fonts, and other static resources
│   ├── components/                 # Reusable UI components
│   │   ├── Action/                 # Button wrapper component
│   │   ├── Link/                   # Anchor/router link component
│   │   └── UserCard/               # User profile card component
│   ├── constants/                  # App-wide constant values
│   │   ├── envs.ts                 # Environment variable constants
│   │   └── vars.ts                 # General constants
│   ├── contexts/                   # React context definitions and providers
│   │   └── CounterContext/         # Counter state context
│   ├── helpers/                    # Pure utility functions
│   │   └── getLocalStorage.ts      # localStorage read helper
│   ├── hooks/                      # Custom React hooks
│   │   └── useCounterContext.tsx   # Hook to consume CounterContext
│   ├── pages/                      # Route-level page components
│   │   ├── AboutPage/
│   │   ├── ContextPage/
│   │   ├── HomePage/
│   │   ├── NotFoundPage/
│   │   ├── ProductPage/
│   │   └── UsersPage/
│   ├── router/                     # Routing configuration
│   │   ├── PublicRoute.tsx         # Route wrapper with redirect logic
│   │   └── TemplateRouter.tsx      # App route definitions
│   ├── services/                   # API communication layer
│   │   └── userService.ts          # User resource API calls
│   ├── styles/                     # Global CSS
│   │   └── global.css
│   ├── types/                      # TypeScript type definitions
│   │   ├── app.ts                  # Domain model types
│   │   ├── contexts.ts             # Context value types
│   │   ├── envs.ts                 # Env variable types
│   │   ├── hooks.ts                # Hook return types
│   │   ├── props.ts                # Component prop types
│   │   └── states.ts               # Component state types
│   ├── App.tsx                     # Root component
│   ├── index.css                   # Entry-point styles
│   └── index.tsx                   # App entry point
├── .env.example                    # Example environment variables
├── eslint.config.js                # ESLint flat config
├── index.html                      # HTML entry point
├── jest.config.js                  # Jest configuration
├── tsconfig.json                   # TypeScript compiler config
└── vite.config.ts                  # Vite build config
```

| Folder / File          | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| `__tests__/`           | All test files, grouped by source category                          |
| `__tests__/__mocks__/` | Reusable mock data (users, envs, localStorage, styles, files)       |
| `src/components/`      | Presentational components reused across pages                       |
| `src/constants/`       | Centralized constants — env vars and general app values             |
| `src/contexts/`        | React Context definitions and their Provider components             |
| `src/helpers/`         | Stateless utility functions with no side effects                    |
| `src/hooks/`           | Custom hooks that encapsulate context consumption or reusable logic |
| `src/pages/`           | One folder per route; each contains a `.tsx` and a `.css` file      |
| `src/router/`          | Route declarations and guards (redirect logic)                      |
| `src/services/`        | `fetch`-based API modules, one per resource                         |
| `src/types/`           | TypeScript interfaces and types, split by concern                   |

## Architecture & Design Patterns

The folder structure above maps directly onto the architectural layers described in this section.

### Component Architecture

The UI is split into two layers:

- **Pages** (`src/pages/`) — route-level components. Each page owns its own state, data fetching, and layout. They are never reused across routes.
- **Components** (`src/components/`) — presentational, stateless building blocks. They receive all data via props and have no knowledge of routing or services.

This separation keeps pages focused on orchestration and components focused on rendering.

### Layered Responsibility

```
index.tsx → App.tsx → Router → Page → Component
                                 ↓
                             Service → fetch API
```

Each layer has a single responsibility:

| Layer         | Responsibility                                     |
| ------------- | -------------------------------------------------- |
| `router/`     | Declare routes, apply guards, scope providers      |
| `pages/`      | Fetch data, manage local state, compose layout     |
| `components/` | Render UI from props, emit events via callbacks    |
| `services/`   | Execute HTTP requests, parse and return typed data |
| `helpers/`    | Pure functions with no side effects                |
| `constants/`  | Centralize configuration values                    |

### State Management

Local component state is handled with `useState` + `useEffect`. For shared state that spans multiple components in a route, the project uses the **Context + Provider + custom hook** pattern:

1. `CounterContext.tsx` — creates the context with a typed interface (`null` default to force provider usage).
2. `CounterProvider.tsx` — owns the state and exposes actions (`addCounter`, `subtractCounter`).
3. `useCounterContext.tsx` — wraps `useContext`, throws if used outside the provider (fail-fast guard).

Providers are scoped at the router level so only the routes that need them pay the cost.

### Routing

React Router v7 with `HashRouter` (compatible with static hosting). Route structure:

- `PublicRoute` wraps all pages as a layout route via `<Outlet />`, ready to be extended with auth or other guards.
- A catch-all `/*` route redirects based on the `VITE_REDIRECT_IF_ROUTE_NOT_EXISTS` env flag — either to `/home` or to the `/not-found` page — making the 404 behavior configurable without code changes.

### Service Layer

Services are plain objects with async methods that call `fetch` directly. They throw on non-`ok` responses so callers can handle errors uniformly with `try/catch`. There is no HTTP client abstraction — the native `fetch` API is sufficient for the template's scope.

### Type Safety

All types live in `src/types/`, split by concern (props, states, contexts, hooks, app models, envs). Components and hooks import only the interfaces they need. Env variables are parsed once in `src/constants/envs.ts` and consumed as a typed object — raw `import.meta.env` access is never scattered across the codebase.

### Semantic HTML & Accessibility

Components use semantic elements over generic `<div>` wrappers:

- `<article>` for self-contained cards, `<header>`/`<footer>` for card sections, `<address>` for contact info.
- `<nav aria-label="...">` for link groups, `<output aria-live="polite">` for live regions.
- `role="status"` / `role="alert"` on loading and error states.
- `rel="noopener noreferrer"` on all `target="_blank"` links.
- `type="button"` on every `<button>` to prevent accidental form submission.

## Testing

Tests mirror the `src/` folder structure under `__tests__/`. Each test file follows the **`renderComponent` / `renderPage` factory pattern**: a typed helper sets up the component with default props (drawn from shared mocks) and accepts overrides. This keeps individual tests short and focused on a single assertion.

- **Components** — rendered in isolation, assertions on DOM structure and accessible roles.
- **Pages** — wrapped in `MemoryRouter` (and providers where needed); services are mocked with `jest.mock` so HTTP never leaves the process.
- **Services** — tested against a real MSW server (`setupServer`) that intercepts at the network level. Default handlers live in `__mocks__/mswHandlers.mock.ts`; per-test overrides use `mockMswServer.use(...)`.
- **Async assertions** — prefer `findBy*` over `waitFor(() => expect(getBy*...))`.

Coverage threshold is enforced at **70%** across branches, functions, lines, and statements.

### Run tests

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run test`          | Run tests once                 |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

## Security Audit

Once the test suite is green, audit dependencies and run the project health check before building.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

### React Doctor

Run a health check on the project (security, performance, dead code, architecture):

```bash
npm run doctor
```

Use `--verbose` to see specific files and line numbers:

```bash
npm run doctor -- --verbose
```

## Build

With tests passing and the security audit clean, generate an optimized production bundle:

```bash
npm run build
```

Vite outputs the compiled static assets to `dist/`. To verify the build locally before deploying:

```bash
npm run preview
```

`preview` serves the contents of `dist/` on a local port so you can confirm the production bundle behaves as expected.

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch, and gates merges by chaining the same quality checks you run locally — linting, type-checking, tests, the production bundle, and the Docker images.

### Pipeline overview

```
                ┌─── PR or push to main ───┐
                ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    lint-and-audit    │─▶│      testing     │─▶│       build      │─▶│    build-docker  │
│  npm lint · tsc -b   │  │     npm test     │  │     npm build    │  │   dev + prod img │
└──────────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
```

Each job runs on `ubuntu-latest`, reuses the Node version declared in [`.nvmrc`](.nvmrc), and caches `npm` between runs via `actions/setup-node@v4`. Jobs run sequentially through `needs:` — if linting fails, tests do not run; if tests fail, the build is not attempted; if the build fails, Docker images are not produced.

### Validation jobs

1. **`lint-and-audit`** — installs deps with `npm ci`, then runs `npm run lint` (ESLint with the strict TypeScript config) and `npm run type-check` (`tsc --noEmit`). This is the same gate that pre-commit enforces locally, repeated in CI to catch anything that bypassed Husky.
2. **`testing`** — runs `npm run test`, which executes the full Jest suite (components, pages, services, helpers, constants) with the 70% coverage threshold enforced. MSW intercepts network calls inside the runner, so no real HTTP traffic leaves the job.
3. **`build`** — runs `npm run build` to confirm the production bundle compiles cleanly from a fresh `npm ci`. Catches type-only regressions that `tsc --noEmit` and tests can miss, plus any Vite build-time failures (asset resolution, env parsing, etc.).
4. **`build-docker`** — builds both `Dockerfile.development` (tagged `app:dev`) and `Dockerfile.production` (tagged `app:prod`) to verify the Compose flows described in [Production](#production) still work end-to-end. Images are built inside the runner and discarded — nothing is pushed to a registry.

### Running the same checks locally

Before pushing, you can replicate the full pipeline locally to avoid round-trips with the CI:

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build

# build-docker
docker build -f Dockerfile.development -t app:dev .
docker build -f Dockerfile.production -t app:prod .
```

### Where the CI output lives

| Output                        | Location                                                   |
| ----------------------------- | ---------------------------------------------------------- |
| Validation logs (lint, types) | **Actions** tab on GitHub                                  |
| Test results & coverage logs  | **Actions** tab on GitHub                                  |
| Production bundle             | Ephemeral, inside the runner (not uploaded as an artifact) |
| Docker images                 | Ephemeral, inside the runner (not pushed to a registry)    |

> **Note:** the pipeline is intentionally scoped to validation only. There is no release job, no tagging, and no artifact publishing — the boilerplate is meant to be cloned and adapted, so version management and distribution belong to the consuming project.

## Production

Production deploys the contents of `dist/` using a **multi-stage Docker image** served by **nginx** running as a **non-root user** (`appuser`, UID 1001). Before promoting an image, make sure you have already run [Testing](#testing), [Security Audit](#security-audit), and [Build](#build) — this section only covers what is **new** to the production pipeline: production env config and Docker distribution.

### Configure production env

Create a production env file based on `.env.example` and adjust values for the target environment:

```bash
cp .env.example .env.production
```

Vite reads these variables at compile time during `npm run build` and bakes the parsed values into the static bundle.

### Architecture

```
Stage 1 — builder : node:22-alpine  →  npm ci  →  npm run build  →  dist/
Stage 2 — runner  : nginx:stable-alpine  →  serves dist/ on port 8080
```

No Node.js or source code ends up in the final image — only nginx and the compiled static files.

### Run with Docker Compose (Prod)

```bash
docker compose -f prod.docker-compose.yml up --build
```

The app is available at `http://localhost:3000` (host port 3000 → container port 8080).

### Build and run manually (Prod)

```bash
docker build -f Dockerfile.production -t my-app:prod .
docker run -p 3000:8080 my-app:prod
```

### What the production image includes

| Feature                  | Detail                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Non-root execution**   | nginx runs as `appuser` (UID 1001); port 8080 avoids privileged binding                                              |
| **Gzip compression**     | Enabled for JS, CSS, JSON, SVG, and font files ≥ 1 KB                                                                |
| **Static asset caching** | JS, CSS, images, and fonts served with `Cache-Control: public, max-age=31536000, immutable`                          |
| **SPA routing**          | All unmatched paths fall through to `index.html` so React Router handles navigation client-side                      |
| **API proxy**            | Requests to `/users` are proxied to the upstream API — no direct cross-origin requests from the browser              |
| **Security headers**     | `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` |
| **Health check**         | Docker polls `http://localhost:8080` every 30 s (3 retries, 5 s timeout, 10 s start grace)                           |

### Development with Docker (Dev)

A separate Compose file is provided for local development with hot-module replacement, as an alternative to the local `npm run dev` flow described in [Getting Started](#getting-started):

```bash
docker compose -f dev.docker-compose.yml up --build
```

Source files are bind-mounted into the container so changes reflect immediately without rebuilding. `node_modules` is kept in an anonymous volume to avoid conflicts with host-installed binaries.

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/react-vite-boilerplate`](https://www.diegolibonati.com.ar/#/project/react-vite-boilerplate)
