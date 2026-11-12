# Coding standard — Next.js (web, admin)

> **Starter version.** The project's Tech Lead copies it, adapts it to the real versions and
> conventions, and declares its path in `apps[].standard` in `.claude/project.yml`. The AI reads it
> before coding and uses it when reviewing.

## Structure

- By feature: `src/features/<feature>/{components,hooks,api,types}`; `src/app/` holds only routes,
  layouts and composition.
- Only truly shared components go in `src/components/`. Never copy an existing component.

## Server and Client Components

- **Server Components** by default. Add `"use client"` only for state, effects, event handlers or browser
  APIs; keep the client boundary as deep as possible.
- Fetch data on the server where possible; no `useEffect` fetching when the server can do it.
- Never send secrets or non-public environment variables to the client.

## Calling the API

- Every API call goes through **one typed client** (`src/lib/api-client.ts` or similar) using types from
  the shared contract (`@<project>/shared`). No scattered `fetch` calls with hand-written URLs.
- Every call handles **loading / error / empty**. Errors show a message the user understands; never swallow errors silently.
- Lists are paginated; never load everything.

## UI

- Tailwind with the design-system tokens; no hard-coded colours or font sizes outside tokens.
- Displayed text goes through i18n if the project uses it.
- Elements e2e tests interact with have `data-testid="<feature>-<element>"`.
- Accessible: buttons are `<button>`, images have `alt`, forms have `label`.

## Types and quality

- TypeScript `strict`; no `any` (use `unknown` and narrow). No unexplained `// @ts-ignore`.
- Forms validate with a schema (for example zod) shared with the types.
- No `console.log`, dead code, or TODOs without an issue number.

## Tests

- Pure logic (hooks, utils, mappers): unit tests.
- Components with important display conditions: Testing Library tests (by role/label, not by class).
- User flows: Playwright in `e2e/`, test names start with the test-case ID.
