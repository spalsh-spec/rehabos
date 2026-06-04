"use client";

import { SPORTS, Sport } from "@/lib/types";

export default function SportSelector({
  value,
  onChange,
}: {
  value: Sport | null;
  onChange: (s: Sport) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">Your sport</label>
      <div className="grid grid-cols-2 gap-2">
        {SPORTS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={`rounded-xl border px-3 py-3 text-sm font-medium text-left transition-colors ${
              value === s
                ? "border-brand-600 bg-brand-50 text-brand-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            }`}
            aria-pressed={value === s}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
