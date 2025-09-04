# Ax Prototype Runner

This scaffolds a React + TypeScript app that can mirror Axure pages and run functions mapped to prototype interactions from `https://ggatdw.axshare.com`.

## Prerequisites
- Node.js 18+ and pnpm or npm installed

## Setup
```bash
# install deps
pnpm install  # or: npm install

# start dev server
pnpm dev       # or: npm run dev
```

Open the app at `http://localhost:5173`.

## How pages work
- Define pages and actions in `src/pages/pages.json`.
- Each page has a `title` and optional `actions` (buttons) each with:
  - `label`: Button text
  - `fn`: Function name to run
  - `to` (optional): Route to navigate after success

Example `src/pages/pages.json`:
```json
{
  "home": { "title": "Home", "actions": [ { "label": "Go to Login", "fn": "noop", "to": "/login" } ] },
  "login": { "title": "Login", "actions": [ { "label": "Submit Login", "fn": "login", "to": "/dashboard" } ] }
}
```

## Adding functions
Add or override functions in `FunctionRunnerProvider` via a custom map. Default stub functions exist in `src/utils/functionRunner.tsx`:
- `noop`, `login`, `refreshData`, `logout`.

To add real implementations, pass your custom functions into `FunctionRunnerProvider` (e.g., fetch APIs) or expand the defaults.

## Routing
- Navigate to `/:pageId` where `pageId` is a key in `pages.json`.
- Root `/` redirects to `/home`.

## Mapping the Axure prototype
- Create entries in `src/pages/pages.json` for every page in the prototype at `https://ggatdw.axshare.com`.
- For each widget interaction, translate to an `action` with an `fn` and optional `to`.
- Implement the `fn` in `src/utils/functionRunner.tsx` or extend via `AppProviders`. 