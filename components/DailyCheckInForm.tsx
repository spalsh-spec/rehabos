"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { shouldProgress, shouldRegress } from "@/lib/safetyRules";

function Slider({
  label,
  value,
  onChange,
  lowText,
  highText,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  lowText: string;
  highText: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}: <span className="font-bold text-brand-700">{value} / 10</span>
      </label>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-teal-600"
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{lowText}</span>
        <span>{highText}</span>
      </div>
    </div>
  );
}

export default function DailyCheckInForm() {
  const router = useRouter();
  const [pain, setPain] = useState(2);
  const [rom, setRom] = useState(5);
  const [confidence, setConfidence] = useState(5);
  const [activity, setActivity] = useState(5);
  const [flare, setFlare] = useState(false);
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function submit() {
    store.addCheckIn({
      date: new Date().toISOString(),
      pain,
      rangeOfMotion: rom,
      confidence,
      activityLevel: activity,
      nextDayFlareUp: flare,
      notes,
    });
    const all = store.loadCheckIns();

    if (pain >= 8) {
      setMessage(
        "Your pain is high today. Pause your exercises and consider contacting a health professional, especially if this continues or worsens."
      );
      return;
    }
    if (shouldRegress(all)) {
      setMessage(
        "Your symptoms have stepped up compared to last time. Ease back: reduce difficulty or volume, and if it keeps worsening, seek professional advice."
      );
      return;
    }
    if (shouldProgress(all)) {
      setMessage(
        "Steady progress over your last few check-ins. Consider progressing to the next step if everything in your plan's progression criteria is met."
      );
      return;
    }
    setMessage("Check-in saved. Keep going — consistency matters more than intensity.");
  }

  if (message) {
    return (
      <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 space-y-4">
        <p className="text-slate-800">{message}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.push("/progress")}
            className="flex-1 rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white"
          >
            View progress
          </button>
          <button
            type="button"
            onClick={() => router.push("/plan")}
            className="flex-1 rounded-2xl border border-brand-600 px-4 py-3 font-semibold text-brand-700"
          >
            Back to plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Slider label="Pain today" value={pain} onChange={setPain} lowText="No pain" highText="Worst" />
      <Slider label="How freely can you move it?" value={rom} onChange={setRom} lowText="Very stiff" highText="Full movement" />
      <Slider label="Confidence in the injured area" value={confidence} onChange={setConfidence} lowText="No trust" highText="Full trust" />
      <Slider label="Activity level today" value={activity} onChange={setActivity} lowText="Rest day" highText="Full training" />

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
        <span className="text-sm text-slate-700">Was it worse the day after your last session?</span>
        <div className="flex gap-1">
          {[
            { v: true, t: "Yes" },
            { v: false, t: "No" },
          ].map((o) => (
            <button
              key={o.t}
              type="button"
              onClick={() => setFlare(o.v)}
              className={`rounded-lg px-4 py-2 text-sm font-medium ${
                flare === o.v ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
              }`}
            >
              {o.t}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
        placeholder="Notes (optional)"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
      />

      <button
        type="button"
        onClick={submit}
        className="w-full rounded-2xl bg-brand-600 px-4 py-4 text-base font-semibold text-white hover:bg-brand-700"
      >
        Save check-in
      </button>
    </div>
  );
}
