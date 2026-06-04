# RehabOS — Setup & Deployment

## Local run

```bash
npm install
npm run dev        # http://localhost:3000
```

The app works immediately with **device-only storage** (localStorage). No account or
Supabase setup is required to use the full core flow.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
```

## Supabase setup (optional for MVP, required for cloud sync)

1. Create a project at supabase.com.
2. Open SQL Editor → run `supabase/schema.sql` (creates all tables + RLS policies).
3. Project Settings → API → copy the URL and anon key.
4. Create `.env.local` from `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

5. Restart `npm run dev`.

Notes:
- RLS: users can only read/write their own intakes, plans, and logs.
- `exercises`, `supplement_articles`, `sport_templates` are public read-only.
- Seed content currently ships in code (`lib/exerciseLibrary.ts`, `lib/rehabPlanGenerator.ts`,
  `lib/supplementRiskRules.ts`). Mirroring it into the SQL tables is a post-MVP step.

## Deploy to Vercel

1. Push the repo to GitHub.
2. vercel.com → New Project → import the repo (framework auto-detected: Next.js).
3. Add the two `NEXT_PUBLIC_SUPABASE_*` env vars (or skip for device-only mode).
4. Deploy. Build command `next build`, output handled automatically.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | No (device-only mode without it) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anon key |
