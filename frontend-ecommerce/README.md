# Spring Next Store — Web (Next.js)

This package is **`spring-next-store-web`**: the **Next.js 15** app for the **Spring Next Store** monorepo (see the [root README](../README.md)).

For an overview, setup, and API configuration, see the **[root README](../README.md)**.

## Quick start

From this directory:

```bash
pnpm install
cp .envexample .env.local   # set NEXT_PUBLIC_BACKEND_URL to your Spring Boot URL
pnpm dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint |

## Layout

Source code lives under `src/`. See **Frontend structure** in the root README for `components/`, `app/`, and `actions/` layout.
