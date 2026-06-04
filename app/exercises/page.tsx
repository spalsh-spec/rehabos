"use client";

import { useMemo, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";
import { EXERCISES } from "@/lib/exerciseLibrary";
import { BODY_AREAS, BodyArea } from "@/lib/types";

export default function ExercisesPage() {
  const [area, setArea] = useState<BodyArea | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return EXERCISES.filter((e) => {
      const areaOk = area === "All" || e.bodyArea === area;
      const q = query.trim().toLowerCase();
      const qOk = !q || e.name.toLowerCase().includes(q) || e.purpose.toLowerCase().includes(q);
      return areaOk && qOk;
    });
  }, [area, query]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Exercise library</h1>
        <p className="mt-1 text-sm text-slate-600">
          {EXERCISES.length} simple, safe exercises. Follow the pain rule: mild and manageable only.
        </p>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search exercises"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        aria-label="Search exercises"
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["All", ...BODY_AREAS] as const).map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setArea(a)}
            className={`shrink-0 rounded-full border px-3 py-2 text-sm ${
              area === a ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((e) => (
          <ExerciseCard key={e.id} exercise={e} />
        ))}
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            No exercises match your search.
          </p>
        )}
      </div>

      <SafetyDisclaimer compact />
    </div>
  );
}
