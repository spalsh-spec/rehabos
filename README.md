# RehabOS

One-stop injury recovery guidance for people who cannot afford regular physiotherapy.
Educational only — RehabOS does not diagnose, treat, prescribe, or replace medical care.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000 on your phone or with mobile viewport.

## Core flow

Landing → Injury intake → Red flag safety screen → (blocked → referral / clear → staged plan)
→ Exercise tutorials → Daily check-ins → Progress tracking.

Extra modules: Mental recovery education, Supplement education (evidence-ranked), Settings & disclaimer.

## Docs

- `docs/DEPLOYMENT.md` — setup, env vars, Supabase, Vercel
- `docs/DECISIONS.md` — key architecture and safety decisions
- `supabase/schema.sql` — full database schema with RLS
