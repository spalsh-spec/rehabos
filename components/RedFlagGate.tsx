"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { evaluateRedFlags, STOP_MESSAGE } from "@/lib/safetyRules";
import { store } from "@/lib/store";
import { IntakeData } from "@/lib/types";

const SAFETY_QUESTIONS: { key: keyof IntakeData; label: string }[] = [
  { key: "visibleDeformity", label: "Does the area look visibly deformed, bent wrong, or out of place?" },
  { key: "suspectedFracture", label: "Do you suspect a broken bone (heard a crack, bone tenderness, cannot use it at all)?" },
  { key: "headInjurySymptoms", label: "Any head knock with headache, dizziness, confusion, vomiting, or memory problems?" },
  { key: "chestPain", label: "Any chest pain?" },
  { key: "breathingDifficulty", label: "Any difficulty breathing?" },
  { key: "feverOrInfectionSigns", label: "Fever, or is the area hot, red, and spreading?" },
  { key: "worseningSymptoms", label: "Are your symptoms clearly getting worse day by day?" },
  { key: "calfSwellingOrShortBreath", label: "Unexplained calf swelling, or sudden shortness of breath?" },
];

export default function RedFlagGate() {
  const router = useRouter();
  const [intake, setIntake] = useState<IntakeData | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<"pending" | "blocked" | "clear">("pending");
  const [flags, setFlags] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setIntake(store.loadIntake());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!intake) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-slate-600 mb-4">No injury details found yet.</p>
        <Link href="/intake" className="inline-block rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white">
          Start injury check
        </Link>
      </div>
    );
  }

  function setAnswer(key: string, value: boolean) {
    setAnswers((p) => ({ ...p, [key]: value }));
  }

  const allAnswered = SAFETY_QUESTIONS.every((q) => answers[q.key as string] !== undefined);

  function check() {
    if (!intake) return;
    const merged: IntakeData = { ...intake, ...(answers as Partial<IntakeData>) };
    store.saveIntake(merged);
    const r = evaluateRedFlags(merged);
    store.saveRedFlag(r);
    setFlags(r.flags);
    if (r.blocked) {
      setResult("blocked");
    } else {
      setResult("clear");
    }
  }

  if (result === "blocked") {
    return (
      <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-6 space-y-4">
        <h2 className="text-xl font-bold text-red-800">Please stop here</h2>
        <p className="text-red-900 font-medium">{STOP_MESSAGE}</p>
        <div>
          <p className="text-sm font-semibold text-red-800 mb-1">Why we are saying this:</p>
          <ul className="list-disc pl-5 text-sm text-red-900 space-y-1">
            {flags.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-red-900">
          These signs can mean something that needs proper assessment. This is a precaution,
          not a diagnosis. If symptoms are severe or rapidly worsening, seek urgent care now.
        </p>
        <Link href="/" className="inline-block rounded-2xl bg-white border border-red-300 px-6 py-3 font-semibold text-red-700">
          Back to home
        </Link>
      </div>
    );
  }

  if (result === "clear") {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 space-y-4">
        <h2 className="text-xl font-bold text-brand-900">No red flags detected</h2>
        <p className="text-sm text-slate-700">
          Based on your answers, no urgent warning signs were detected. This is a screening,
          not a diagnosis — if anything changes or worsens, stop and seek professional care.
        </p>
        <button
          type="button"
          onClick={() => router.push("/plan")}
          className="w-full rounded-2xl bg-brand-600 px-4 py-4 text-base font-semibold text-white hover:bg-brand-700"
        >
          See my rehab pathway
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        A few safety questions before any exercise guidance. Answer honestly — these matter.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 divide-y divide-slate-100">
        {SAFETY_QUESTIONS.map((q) => (
          <div key={q.key as string} className="py-3">
            <p className="text-sm text-slate-800 mb-2">{q.label}</p>
            <div className="flex gap-2">
              {[
                { v: true, t: "Yes" },
                { v: false, t: "No" },
              ].map((o) => (
                <button
                  key={o.t}
                  type="button"
                  onClick={() => setAnswer(q.key as string, o.v)}
                  className={`rounded-lg px-5 py-2 text-sm font-medium ${
                    answers[q.key as string] === o.v
                      ? o.v
                        ? "bg-red-600 text-white"
                        : "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                  aria-pressed={answers[q.key as string] === o.v}
                >
                  {o.t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={!allAnswered}
        onClick={check}
        className="w-full rounded-2xl bg-brand-600 px-4 py-4 text-base font-semibold text-white disabled:opacity-40"
      >
        Run safety check
      </button>
    </div>
  );
}
