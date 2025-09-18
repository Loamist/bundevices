# bundevices: IoT Monitoring Hub

This project is a small full‑stack app built with Bun, Fastify, React, and Drizzle. It simulates an IoT monitoring hub that manages a set of devices running 24/7 and sending periodic status updates.

Your goal is to extend the system to store and visualize device updates, expose a validated API endpoint, and indicate device online/offline status, including realtime status changes.

## Context

- The app uses PGLite (an in‑memory PostgreSQL‑compatible database) via Drizzle ORM.

- Each device sends an update every minute with:
  - `id`: uuid string v4
  - `uptime`: minutes (number)
  - `load`: percentage/integer (number)
  - `freeMem`: megabytes (number)

Example payload:
```json
{
  "id": "...",
  "uptime": 20,
  "load": 10,
  "freeMem": 512
}
```

- A device is considered online if it reported at least once in the last minute.

> IMPORTANT: The is a simulation that sends updates to the API every 1 to 5 seconds. This simulation is running automatically when the API starts.

## What you need to build

- Add persistence for device updates and expose them through the API.
- Show updates in the UI and indicate whether devices are online/offline.
- Update device status in realtime on the home page when a device goes online/offline.

## Tasks

- [ ] Add a table for the `device_updates`.
- [ ] Develop the `POST /api/devices/:id` endpoint. This endpoint must be called using a `POST` request and must receive the payload described above. The endpoint payload must be validated.
- [ ] Update the home page for displaying the updates of a given device.
- [ ] Display whether the devices are online or offline.
- [ ] Dynamically change the status of the devices in the home page according to status changes. Ie. if a device becomes active, its status must change from offline to online in realtime, without refreshing the page.
- [ ] The test suite and the linter is passing. Keep it that way.
- [ ] Add some basic test to your API to know you more about how you work with the codebase.

### Acceptance criteria

- Database contains a table storing updates linked to devices.
- `POST /api/devices/:id` accepts and validates the described payload and persists it.
- Home page displays updates for a selected device and shows device online/offline state.
- Device online/offline indicator updates in realtime without page refresh.
- Linting and existing tests continue to pass; new tests cover your additions.

## Tech stack

- **Runtime**: Bun >= 1.2.19
- **API**: Fastify 5, TypeBox schemas, CORS
- **DB**: Drizzle ORM + PGLite (in‑memory PostgreSQL)
- **UI**: React 19 with Tailwind CSS
- **Tooling**: TypeScript, Biome, Bun test runner

## Project layout

- API code: `api/` (Fastify app, routes, plugins, db schema)
- Web app: `web/` (React + Tailwind)
- Tests: `test/`

Notable files:
- `api/routes/devices.ts` — current devices endpoint
- `api/plugins/db.ts` — Drizzle/PGLite setup
- `api/db/schema.ts` — Drizzle schema (contains `devices` table)
- `web/components/Devices.tsx` — devices table UI

## Running locally

1. Install dependencies:
   ```bash
   bun install
   ```

2. Configure environment:
   ```bash
   cp env.example .env
   ```

3. Start the API and Web app (concurrently):
   ```bash
   bun run start
   ```

API runs on `http://localhost:3000`. Web runs on `http://localhost:3001`.

> Note: The migrations are applied automatically when the API starts.

## Available scripts

- `bun run start` — start API and Web (watch mode)
- `bun test` — run tests
- `bun test --watch` — watch tests
- `bun test --coverage` — coverage report
- `bun run lint` — lint with Biome
- `bun run lint:fix` — auto-fix with Biome
- `bun run db:generate` — generate migrations
- `bun run typecheck` — TypeScript typecheck

## API (existing)

- `GET /api/health` — server health status
- `GET /api/devices` — list devices
- `GET /documentation` — API documentation, you can use it to test the API.

## Implementation notes and hints

- Use Drizzle to define the `device_updates` table.
- Use TypeBox for request validation in Fastify route schemas.
- Realtime can be implemented using Server‑Sent Events (SSE), polling or WebSockets. Keep it simple.

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DEV_MODE` | `false` | Enable development mode |
| `PORT` | `3000` | API server port |
| `HOST` | `127.0.0.1` | API server host |
| `LOG_LEVEL` | `info` | Log level |
| `CORS_ORIGIN` | `http://localhost:3000,http://localhost:3001` | Allowed origins |
| `BUN_PUBLIC_API_URL` | `http://localhost:3000` | Public API URL for the web app |

## Testing

Run tests with Bun’s test runner:

```bash
bun test
```

## What we evaluate

- Correctness and completeness vs. acceptance criteria
- Type safety and schema validation
- Code clarity, structure, and naming
- Tests quality and coverage of new logic
- Simplicity of the realtime solution
- Lint/typecheck cleanliness (no regressions)
