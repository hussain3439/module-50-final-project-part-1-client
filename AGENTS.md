<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Final-project job marketplace ("HireLoop"). A single Next.js 16 App Router app — the better-auth API runs inside it (`app/api/auth/[...all]/route.ts` → `lib/auth.ts`, MongoDB database `hire-loopDB`); there is no separate backend repo. No test suite, no CI.

## Commands

- Dev server: `npm run dev`
- Verify changes: `npm run lint` → `npm run typecheck` → `npm run build` (lint is bare `eslint`, flat config; there is no test suite)
- Format: `npm run format` (prettier, ts/tsx files only)
- Add shadcn components: `npx shadcn@latest add <name>` → lands in `components/ui`

## Environment

`.env` is gitignored. Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`. `lib/auth.ts` also reads `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` (GitHub social sign-in), which are not yet in `.env`.

## Non-obvious conventions

- Path alias `@/*` maps to the repo root (no `src/`): `@/components`, `@/lib`, `@/app/assets`. Note `cn` is also a real npm dependency, re-exported by `lib/utils.ts`.
- `components/ui` is shadcn "base-nova" built on **@base-ui/react**, not Radix: compose elements with `render={<Link href="…" />}`; there is no `asChild` prop. Styling is Tailwind v4 CSS-first — theme tokens live in `app/globals.css` (`@theme inline`), no `tailwind.config` file.
- better-auth client helpers (`signIn`, `signOut`, `useSession`) come from `@/lib/auth-client`. `lib/auth.ts` declares a server-managed `user.role` field (seeker/recruiter/admin, `input: false`) — it cannot be set from the client.
- Prettier enforces `endOfLine: lf`, no semicolons, double quotes; Tailwind classes are auto-sorted inside `cn`/`cva` calls. Keep files LF even on Windows.
- `next` (16.4.4) and `react` (19.3.1) are pinned to exact versions — don't upgrade casually.
- `CLAUDE.md` is just `@AGENTS.md` — this file is the single source of agent instructions.
