"use client";

import { useState } from "react";
import { Exercise } from "@/lib/types";

const DIFF_LABEL: Record<number, string> = { 1: "Gentle", 2: "Moderate", 3: "Advanced" };

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-slate-900">{exercise.name}</h3>
            <p className="text-sm text-slate-600">{exercise.purpose}</p>
          </div>
          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {DIFF_LABEL[exercise.difficulty]}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          {exercise.bodyArea} · {exercise.equipment.join(", ")}
        </p>
      </button>

      {open && (
        <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
          <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-400">
            Video tutorial coming soon
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">How to do it</p>
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              {exercise.instructions.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Common mistakes</p>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              {exercise.commonMistakes.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-900">{exercise.safetyNotes}</p>
          <div className="grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Make it harder:</span> {exercise.progression}
            </p>
            <p>
              <span className="font-semibold">Make it easier:</span> {exercise.regression}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
