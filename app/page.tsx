import Link from "next/link";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";

const FEATURES = [
  { title: "Safety first", body: "Red flag screening before any exercise guidance. If something looks serious, we tell you to get proper care." },
  { title: "Staged rehab pathways", body: "Phase by phase guidance from calm and protect through to return to sport — with clear pain rules." },
  { title: "Exercise library", body: "Simple tutorials with mistakes to avoid, safety notes, and easier or harder versions." },
  { title: "Track your recovery", body: "Daily check-ins for pain, movement, confidence, and activity — see your trend over time." },
  { title: "Mental recovery", body: "Fear of reinjury, lost confidence, and frustration are normal. Supportive education, not therapy." },
];

export default function LandingPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 pt-4">
        <h1 className="text-3xl font-bold leading-tight text-slate-900">
          Recover smarter when physio is not affordable.
        </h1>
        <p className="text-base text-slate-600">
          Sport specific rehab guidance, exercise tutorials, safety checks, progress tracking,
          and mental recovery support in one simple app.
        </p>
        <div className="space-y-2">
          <Link
            href="/intake"
            className="block w-full rounded-2xl bg-brand-600 px-4 py-4 text-center text-base font-semibold text-white hover:bg-brand-700"
          >
            Start injury check
          </Link>
          <Link
            href="/exercises"
            className="block w-full rounded-2xl border border-brand-600 px-4 py-4 text-center text-base font-semibold text-brand-700 hover:bg-brand-50"
          >
            Browse exercises
          </Link>
        </div>
      </section>

      <SafetyDisclaimer />

      <section className="space-y-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-4">
            <h2 className="font-semibold text-slate-900">{f.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-2 gap-2">
        <Link href="/mental" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 hover:border-brand-600">
          Mental recovery →
        </Link>
        <Link href="/supplements" className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 hover:border-brand-600">
          Supplement education →
        </Link>
      </section>
    </div>
  );
}
