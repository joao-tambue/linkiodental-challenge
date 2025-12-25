# Linkio Challenge

A small Express + TypeScript API demonstrating authentication and order management using JWT, MongoDB and bcrypt. This repository is a coding challenge scaffold that implements routes, controllers, models, and tests so contributors can run, extend, and evaluate the sample application quickly.

![version](https://img.shields.io/badge/version-1.0.0-blue) ![license](https://img.shields.io/badge/license-ISC-lightgrey)

## Table of Contents

- [What the project does](#what-the-project-does)
- [Why this is useful](#why-this-is-useful)
- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Examples](#examples)
- [Running tests](#running-tests)
- [Where to get help](#where-to-get-help)
- [Maintainers & Contributing](#maintainers--contributing)

## What the project does

Linkio Challenge is a minimal REST API implemented with Express and TypeScript that includes user authentication (JWT) and basic order management. The codebase is intentionally small to make it easy to review and extend for interviews, tests, or learning purposes.

## Why this is useful

- Demonstrates a typical Node + TypeScript API structure.
- Implements real-world concerns: authentication, password hashing, and MongoDB persistence.
- Lightweight and easy to run locally for testing or evaluation.

## Features

- JWT-based authentication and authorization
- Password hashing with `bcrypt`/`bcryptjs`
- Order model and controller
- Organized TypeScript project structure (controllers, routes, models, middlewares)

## Getting Started

Prerequisites:

- Node.js (v18+ recommended)
- A running MongoDB instance (local or cloud)

Clone and install:

```bash
git clone <repo-url>
cd linkio-challenge
npm install
```

Run in development (auto-reload with TypeScript):

```bash
npm run dev
```

Build and start (production):

```bash
npm run build
npm start
```

## Configuration

Create a `.env` file in the project root (example keys used by the app):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/linkio
JWT_SECRET=your_jwt_secret_here
```

Adjust values as needed. The app reads configuration from `process.env` via `src/config/db.ts` and `src/server.ts`.

## Scripts

Available npm scripts (from `package.json`):

```bash
npm run dev    # Run with ts-node-dev for development
npm run build  # Compile TypeScript to /dist
npm start      # Start the compiled app from /dist
```

## Examples

Common endpoints are organized under routes and controllers. See the source for details: [src/server.ts](src/server.ts), [src/app.ts](src/app.ts).

Register / Login (example):

```bash
# Register (example)
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'

# Login (example)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

Create an order (authenticated):

```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"item":"Widget","qty":2}'
```

See route definitions in [src/routes](src/routes) and controller logic in [src/controllers](src/controllers).

## Running tests

This repo includes a test file at [tests/order.test.ts](tests/order.test.ts). Tests use `vitest` which is included as a dependency.

Run tests via npx (or add a `test` script if you prefer):

```bash
npx vitest
```

## Where to get help

- Open an issue in this repository for bugs or questions.
- Inspect source files and tests for usage examples: [tests/order.test.ts](tests/order.test.ts).

## Maintainers & Contributing

Maintainers: repository owners and collaborators. For contribution guidelines, see `docs/CONTRIBUTING.md` (if present) or open an issue to discuss changes.

If you'd like me to add a `CONTRIBUTING.md`, CI configuration, or expand API docs, tell me which you'd prefer and I can scaffold them.

---

File references:

- [src/server.ts](src/server.ts)
- [src/app.ts](src/app.ts)
- [src/controllers/auth.controller.ts](src/controllers/auth.controller.ts)
- [src/controllers/order.controller.ts](src/controllers/order.controller.ts)
- [tests/order.test.ts](tests/order.test.ts)
