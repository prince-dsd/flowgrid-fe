# FlowForge Frontend

FlowForge is a workflow automation workspace for building, managing, and monitoring integrations and automated processes.

This repository contains the Next.js frontend for FlowForge. It currently provides the application shell and dashboard navigation, while workflow editing, credentials, execution history, and workspace settings are prepared as placeholder areas for continued implementation.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-149ECA?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-not%20specified-lightgrey)](#license)

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Project status](#project-status)
- [Getting started](#getting-started)
- [Available routes](#available-routes)
- [Environment variables](#environment-variables)
- [Development workflow](#development-workflow)
- [Docker](#docker)
- [Project structure](#project-structure)
- [Architecture notes](#architecture-notes)
- [Testing and quality](#testing-and-quality)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

FlowForge organizes automation functionality into a small set of workspace areas:

- **Workflows** - create and maintain workflow definitions.
- **Executions** - inspect workflow runs and their results.
- **Credentials** - manage access to external integrations.
- **Settings** - configure workspace preferences.

The home route redirects users to the dashboard. From the dashboard, each workspace area is available as a dedicated route.

## Features

### Currently available

- Responsive dark-themed workspace UI
- Central dashboard with navigation cards
- Placeholder pages for all primary workspace sections
- Back-to-dashboard navigation from placeholder pages
- Strict TypeScript configuration
- Next.js App Router structure
- Standalone production output for container deployment
- ESLint and TypeScript quality commands

### Planned or in progress

The repository reserves directories and routes for the following functionality:

- Workflow visual editor
- Workflow and node management
- Workflow execution list and details
- Integration catalog
- Credential creation and storage
- Authentication
- Workspace settings
- API and backend integration
- State management and reusable domain services

These areas currently contain placeholder files or placeholder pages and should not be treated as implemented product features.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) |
| UI library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Routing | Next.js App Router |
| Styling | Global CSS in `src/app/globals.css` |
| Linting | ESLint 9 with Next.js Core Web Vitals and TypeScript rules |
| Package manager | npm |
| Runtime | Node.js 22 |
| Containerization | Docker with a multi-stage Node.js image |

No UI component library or third-party state management package is currently configured.

## Project status

This project is in an **early frontend scaffold** stage:

- Core application pages exist.
- `/dashboard` is the main navigation entry point.
- Feature implementation directories are present for future growth.
- There is no configured API client or backend connection in the current source.
- There are no environment variables required for the default local build.
- There is no automated test suite yet.

## Getting started

### Prerequisites

- Node.js 22 or newer
- npm 10 or newer

Using the Node.js version declared by the Docker configuration is recommended.

### 1. Clone the repository

```bash
git clone https://github.com/redgrid-ai/flowforge-fe.git
cd flowforge-fe
```

### 2. Install dependencies

```bash
npm ci
```

Use `npm ci` for a clean, lockfile-based install. Use `npm install` only when intentionally changing dependencies.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The `/` route immediately redirects to `/dashboard`.

The development server supports Next.js fast refresh. Changes to source files are reflected in the browser after recompilation.

### 4. Run a production build

```bash
npm run build
npm run start
```

The production server listens on port `3000` by default.

## Available routes

| Route | Description | Status |
| --- | --- | --- |
| `/` | Redirects to `/dashboard` | Implemented |
| `/dashboard` | Workspace overview and section navigation | Implemented |
| `/workflows` | Workflow builder and workflow list | Placeholder |
| `/executions` | Workflow run history and execution details | Placeholder |
| `/credentials` | Connected accounts and credential management | Placeholder |
| `/settings` | Workspace and user preferences | Placeholder |

The `/src/app/(auth)/` directory is reserved for future authentication routes but does not currently expose a route.

## Environment variables

The application does not currently read environment variables.

If future configuration is added, keep secrets server-side and never expose private values with a `NEXT_PUBLIC_` prefix. Browser-visible variables are not secret.

The repository ignores local environment files while allowing `.env.example` to be committed:

```bash
cp .env.example .env.local
```

There is no `.env.example` file in the current repository. Add one when environment-backed configuration is introduced.

## Development workflow

### NPM scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the repository |
| `npm run typecheck` | Run TypeScript without emitting files |

Recommended validation before a pull request:

```bash
npm run typecheck
npm run lint
npm run build
```

### Path aliases

TypeScript maps `@/*` to `src/*`, so application imports can use:

```ts
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";
```

instead of a relative path such as `../../../components/dashboard/section-placeholder`.

### Styling conventions

- Global styles and design tokens live in `src/app/globals.css`.
- Shared layout styles use semantic classes such as `.shell`, `.topbar`, and `.content`.
- The UI uses a dark color scheme by default.
- Keep interactive cards keyboard accessible and preserve clear focus states.
- Preserve reduced-motion behavior for transitions and animations.

### Adding a route

Create a `page.tsx` inside a directory under `src/app`:

```text
src/app/example/page.tsx
```

The corresponding route will be `/example`.

Use the shared `SectionPlaceholder` component for consistent placeholder presentation until a route receives a real implementation.

## Docker

The included `Dockerfile` uses a multi-stage build:

1. **dependencies** - installs the npm dependency tree with `npm ci`
2. **builder** - creates the Next.js standalone build
3. **runner** - copies the standalone server and static assets into a small Node.js 22 Alpine image

### Build the image

```bash
docker build -t flowforge/frontend:latest .
```

### Run the container

```bash
docker run --rm -p 3000:3000 flowforge/frontend:latest
```

Open [http://localhost:3000](http://localhost:3000).

The container sets `NODE_ENV=production`, listens on port `3000`, and starts `server.js` from the standalone Next.js output.

## Project structure

```text
.
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Reserved for authentication routes
│   │   ├── credentials/
│   │   ├── dashboard/
│   │   ├── executions/
│   │   ├── settings/
│   │   ├── workflows/
│   │   ├── globals.css         # Global styles and design tokens
│   │   ├── layout.tsx          # Root layout and metadata
│   │   └── page.tsx            # Redirect from /
│   ├── components/
│   │   ├── dashboard/          # Dashboard shared components
│   │   ├── edges/              # Reserved for workflow graph edges
│   │   ├── execution/          # Reserved for execution UI
│   │   ├── nodes/              # Reserved for workflow graph nodes
│   │   ├── ui/                 # Reserved for reusable UI primitives
│   │   └── workflow-editor/    # Reserved for the workflow editor
│   ├── features/
│   │   ├── auth/
│   │   ├── executions/
│   │   ├── integrations/
│   │   └── workflows/
│   ├── hooks/                  # Reserved for React hooks
│   ├── lib/                    # Reserved for shared libraries
│   ├── services/               # Reserved for API integrations
│   ├── stores/                 # Reserved for client state
│   ├── types/                  # Reserved for shared types
│   └── utils/                  # Reserved for utility functions
├── Dockerfile
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

The `.gitkeep` files mark directories that do not yet contain implementation files.

## Architecture notes

### App Router

The application uses the Next.js App Router. Server components are the default; add the `"use client"` directive only when a component requires browser APIs or React state and effects.

### Metadata

Root application metadata is declared in `src/app/layout.tsx`:

- Title: `FlowForge`
- Description: `Build and monitor your workflows.`
- Language: `en`

### Navigation

The dashboard uses internal anchor links for the current routes. Replace these with Next.js `Link` components when navigation behavior, prefetching, or route-level loading state becomes relevant.

### Production output

`next.config.ts` enables `output: "standalone"` for deployment to Docker or other container platforms. The standalone build contains the minimal server and traced dependencies required to run the application.

## Testing and quality

At present, the repository does not include a test runner or test files.

Quality checks available today:

```bash
npm run typecheck
npm run lint
npm run build
```

As functionality is added, place focused tests alongside the feature implementation or in the repository's established test directory. Cover behavior that can fail independently, including route rendering, form validation, API error states, and workflow editor interactions.

## Troubleshooting

### `npm ci` fails

- Verify Node.js and npm are installed.
- Remove `node_modules` and retry:

  ```bash
  rm -rf node_modules
  npm ci
  ```

- Confirm `package-lock.json` has not been modified unintentionally.

### Port 3000 is already in use

Start the development server on another port:

```bash
npm run dev -- --port 3001
```

For a production container, publish a host port different from `3000`:

```bash
docker run --rm -p 3001:3000 flowforge/frontend:latest
```

### Build cannot find a module

- Run `npm ci` to restore dependencies.
- Verify imports use the `@/*` alias consistently with `tsconfig.json`.
- Confirm the imported file exists and its filename is case-correct.

### Docker build fails

Build from the repository root so Docker can access `package.json`, `package-lock.json`, `src`, and the Next.js configuration:

```bash
docker build -t flowforge/frontend:latest .
```

## Contributing

Contributions should preserve the existing App Router structure and strict TypeScript conventions.

Before opening a change:

1. Create a focused branch.
2. Implement one feature or fix.
3. Keep new routes and components under the appropriate `src/app`, `src/components`, or `src/features` directory.
4. Use the existing naming and style patterns.
5. Run type checking, linting, and the production build.
6. Document new environment variables and routes.
7. Add focused tests when test infrastructure is introduced.

Example:

```bash
git checkout -b feature/workflow-editor
npm run typecheck
npm run lint
npm run build
git add .
git commit -m "Add workflow editor foundation"
git push -u origin feature/workflow-editor
```

Keep pull requests scoped and avoid committing generated `.next`, `node_modules`, coverage, or environment files.

## License

No license has been specified for this repository. All rights are therefore not explicitly granted until a license is added.
