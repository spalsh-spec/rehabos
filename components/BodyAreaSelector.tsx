"use client";

import { SPORT_PROFILES } from "@/lib/sportMappings";
import { BODY_AREAS, BodyArea, Sport } from "@/lib/types";

export default function BodyAreaSelector({
  sport,
  value,
  onChange,
}: {
  sport: Sport | null;
  value: BodyArea | null;
  onChange: (a: BodyArea) => void;
}) {
  const common = sport ? SPORT_PROFILES[sport].commonAreas : [];
  const concussion = sport ? SPORT_PROFILES[sport].concussionWarning : false;
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">Injured area</label>
      {concussion && (
        <p className="mb-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800">
          Contact sport note: any head knock with headache, dizziness, confusion, or memory
          problems needs medical assessment — do not use this app for head injuries.
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {BODY_AREAS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => onChange(a)}
            className={`rounded-xl border px-3 py-3 text-sm font-medium text-left transition-colors ${
              value === a
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
            aria-pressed={value === a}
          >
            {a}
            {common.includes(a) && (
              <span className="block text-[10px] text-brand-600 font-normal">
                common in {sport}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
