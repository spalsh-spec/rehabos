"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RehabPhaseCard from "@/components/RehabPhaseCard";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";
import { generatePlan, getPathway } from "@/lib/rehabPlanGenerator";
import { store } from "@/lib/store";
import { GeneratedPlan, RehabPathway } from "@/lib/types";

export default function PlanPage() {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [pathway, setPathway] = useState<RehabPathway | null>(null);
  const [state, setState] = useState<"loading" | "no-intake" | "blocked" | "no-pathway" | "ready">("loading");
  const [noPathwayNote, setNoPathwayNote] = useState("");

  useEffect(() => {
    const intake = store.loadIntake();
    if (!intake) {
      setState("no-intake");
      return;
    }
    const redFlag = store.loadRedFlag();
    if (!redFlag) {
      setState("no-intake"); // safety not completed — send back through the flow
      return;
    }
    if (redFlag.blocked) {
      setState("blocked");
      return;
    }
    const p = generatePlan(intake);
    if (!p) {
      const res = generatePlanNote(intake.bodyArea);
      setNoPathwayNote(res);
      setState("no-pathway");
      return;
    }
    store.savePlan(p);
    setPlan(p);
    setPathway(getPathway(p.pathwayId) ?? null);
    setState("ready");
  }, []);

  function generatePlanNote(_area: string): string {
    return "We do not have a structured pathway for this area yet. Self-guided guidance here would be too uncertain, so please see a qualified health professional. You can still browse the exercise library for general education.";
  }

  if (state === "loading") return null;

  if (state === "no-intake") {
    return (
      <Empty
        title="No completed injury check"
        body="Complete the injury check and safety screening first, then your pathway appears here."
        cta={{ href: "/intake", label: "Start injury check" }}
      />
    );
  }

  if (state === "blocked") {
    return (
      <Empty
        title="Self-guided rehab is paused"
        body="Your safety screening found warning signs. Do not continue with self guided rehab. Seek medical care or contact a qualified health professional. You can re-run the check if your situation changes after professional review."
        cta={{ href: "/intake", label: "Re-run injury check" }}
        tone="red"
      />
    );
  }

  if (state === "no-pathway") {
    return (
      <Empty
        title="No structured pathway for this area yet"
        body={noPathwayNote}
        cta={{ href: "/exercises", label: "Browse exercise library" }}
        tone="amber"
      />
    );
  }

  if (!plan || !pathway) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{pathway.name}</h1>
        <p className="mt-1 text-sm text-slate-600">{pathway.description}</p>
        <p className="mt-2 text-xs text-slate-500">
          {plan.sport} · {plan.bodyArea} · Suggested frequency: {plan.frequency}
        </p>
      </div>

      {plan.isApproximateMatch && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold mb-1">Approximate match</p>
          <p>{plan.matchNote}</p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-700">
          This is general educational guidance matched by rules — not a personalised medical
          program. Recovery timelines vary and no outcome is guaranteed. If unsure at any
          point, get a professional assessment.
        </p>
      </div>

      <div className="space-y-3">
        {pathway.phases.map((ph) => (
          <RehabPhaseCard key={ph.number} phase={ph} isCurrent={ph.number === plan.currentPhase} />
        ))}
      </div>

      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm font-semibold text-red-800 mb-1">Stop and seek help if you notice</p>
        <ul className="list-disc pl-5 text-sm text-red-900 space-y-0.5">
          {plan.warningSigns.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900 mb-2">Return to sport checklist</p>
        <p className="text-xs text-slate-500 mb-2">
          A checklist, not a clearance. Consider progressing toward sport if all of these hold:
        </p>
        <ul className="space-y-1">
          {plan.returnChecklist.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-0.5 inline-block h-4 w-4 shrink-0 rounded border border-slate-300" />
              {c}
            </li>
          ))}
        </ul>
        {pathway.returnToSportTest.length > 0 && (
          <div className="mt-3 border-t border-slate-100 pt-3">
            <p className="text-xs font-semibold text-slate-500 mb-1">Pathway-specific tests</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-0.5">
              {pathway.returnToSportTest.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link
        href="/checkin"
        className="block w-full rounded-2xl bg-brand-600 px-4 py-4 text-center text-base font-semibold text-white hover:bg-brand-700"
      >
        Do today&apos;s check-in
      </Link>

      <SafetyDisclaimer compact />
    </div>
  );
}

function Empty({
  title,
  body,
  cta,
  tone = "default",
}: {
  title: string;
  body: string;
  cta: { href: string; label: string };
  tone?: "default" | "red" | "amber";
}) {
  const toneClass =
    tone === "red"
      ? "border-red-200 bg-red-50"
      : tone === "amber"
        ? "border-amber-200 bg-amber-50"
        : "border-slate-200 bg-white";
  return (
    <div className={`rounded-2xl border p-6 text-center space-y-4 ${toneClass}`}>
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-700">{body}</p>
      <Link href={cta.href} className="inline-block rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">
        {cta.label}
      </Link>
    </div>
  );
}
