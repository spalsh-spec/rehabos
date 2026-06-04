# RehabOS — Key Decisions

1. **Local-first storage with Supabase-ready schema.** The core flow uses localStorage so a
   stressed injured user gets value in under a minute with zero signup friction. The full
   Supabase SQL schema + RLS ships in `supabase/schema.sql`; `lib/supabaseClient.ts` activates
   automatically when env vars exist. This keeps the MVP demoable anywhere and the build green
   without secrets.

2. **Deterministic rules only — no AI in the medical flow.** Red flags, pathway matching, phase
   selection, and progression/regression are pure functions in `lib/safetyRules.ts` and
   `lib/rehabPlanGenerator.ts`. Auditable, testable, and safe by design.

3. **Any single red flag blocks guidance.** Conservative OR-logic gate. The block screen never
   diagnoses; it routes to professional care.

4. **Conservative phase selection.** Days-since-injury sets a ceiling; current pain, swelling,
   movement, and instability cap it downward. The app never accelerates a user past symptoms.

5. **Approximate-match transparency.** Foot/Quadriceps/Hip map to the closest seeded pathway
   with an explicit "approximate match" warning. Neck gets no self-guided pathway (too
   sensitive) — referral prompt instead.

6. **No "safe to play" language anywhere.** Return-to-sport is a checklist with "consider
   progressing if" phrasing and a professional-assessment recommendation.

7. **Supplements: education with risk ranking, no dosages.** Five evidence tiers; SARMs/peptides
   flagged as risky/banned; painkillers routed to professional advice.

8. **No chart library.** Progress chart is a ~40-line inline SVG — fewer dependencies, faster
   mobile load.

9. **Single-column max-w-xl mobile-first layout** with a fixed bottom nav — usable one-handed
   by an injured person on a phone.
