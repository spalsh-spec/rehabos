"use client";

import { DailyCheckIn } from "@/lib/types";

/** Lightweight SVG line chart — no chart library needed for MVP. */
export default function ProgressChart({ checkins }: { checkins: DailyCheckIn[] }) {
  if (checkins.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
        No check-ins yet. Complete a daily check-in to start tracking.
      </div>
    );
  }

  const recent = checkins.slice(-14);
  const w = 320;
  const h = 140;
  const pad = 20;
  const n = recent.length;

  function points(get: (c: DailyCheckIn) => number): string {
    return recent
      .map((c, i) => {
        const x = n === 1 ? w / 2 : pad + (i * (w - pad * 2)) / (n - 1);
        const y = h - pad - (get(c) / 10) * (h - pad * 2);
        return `${x},${y}`;
      })
      .join(" ");
  }

  const series = [
    { name: "Pain", color: "#dc2626", pts: points((c) => c.pain) },
    { name: "Movement", color: "#0d9488", pts: points((c) => c.rangeOfMotion) },
    { name: "Confidence", color: "#2563eb", pts: points((c) => c.confidence) },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Progress chart of pain, movement, and confidence over recent check-ins">
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#e2e8f0" />
        <line x1={pad} y1={pad} x2={w - pad} y2={pad} stroke="#f1f5f9" strokeDasharray="4 4" />
        {series.map((s) => (
          <polyline key={s.name} points={s.pts} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </svg>
      <div className="mt-2 flex gap-4 text-xs">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1 text-slate-600">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-400">Last {recent.length} check-ins · scale 0-10</p>
    </div>
  );
}
