"use client";

import { useEffect, useState } from "react";
import MentalRecoveryCard from "@/components/MentalRecoveryCard";
import { store } from "@/lib/store";
import { MentalLog } from "@/lib/types";

const TOPICS = [
  { title: "Fear of reinjury", body: "Worrying about getting hurt again is one of the most common parts of recovery. Gradual, planned exposure to movement — the same staging your rehab plan uses — is also how confidence rebuilds. Fear easing over weeks is a good sign. Fear that stays intense may benefit from professional support." },
  { title: "Loss of confidence", body: "Confidence usually returns behind physical capacity, not ahead of it. Hitting small milestones (a comfortable session, a completed phase) is evidence your body can be trusted again. Track your confidence score below and look at the trend, not single days." },
  { title: "Identity loss from not training", body: "If sport is a big part of who you are, time away can feel like losing part of yourself. That reaction is normal. Staying connected to your team or training environment in another role, even briefly, helps many people." },
  { title: "Frustration management", body: "Recovery is rarely a straight line. Flare ups and flat weeks are part of the process, not proof you have failed. Focus on what you control today: your check-in, your exercises, your sleep." },
  { title: "Sleep and recovery habits", body: "Sleep is when most tissue repair happens. A regular bedtime, a dark cool room, and cutting late caffeine are simple, free recovery tools — often more useful than anything you can buy." },
  { title: "Return to sport anxiety", body: "Nerves before returning are near universal. The return checklist exists so the decision rests on evidence, not just feel. A gradual return through training before competition lowers both reinjury risk and anxiety." },
];

const PROMPTS = [
  "What is one thing your body handled better this week than last week?",
  "What are you most worried about right now, in one sentence?",
  "What would you tell a teammate who had this same injury?",
  "What is one thing you can control tomorrow?",
];

export default function MentalPage() {
  const [logs, setLogs] = useState<MentalLog[]>([]);
  const [confidence, setConfidence] = useState(5);
  const [entry, setEntry] = useState("");
  const [prompt, setPrompt] = useState(PROMPTS[0]);
  const [saved, setSaved] = useState(false);
  const [breathing, setBreathing] = useState(false);

  useEffect(() => {
    setLogs(store.loadMentalLogs());
  }, []);

  function save() {
    store.addMentalLog({
      date: new Date().toISOString(),
      confidenceScore: confidence,
      journalEntry: entry,
      prompt,
    });
    setLogs(store.loadMentalLogs());
    setEntry("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mental recovery</h1>
        <p className="mt-1 text-sm text-slate-600">
          The mental side of injury is real. This is supportive education — not therapy or
          psychological treatment.
        </p>
      </div>

      <div className="space-y-3">
        {TOPICS.map((t) => (
          <MentalRecoveryCard key={t.title} title={t.title} body={t.body} />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <h2 className="font-semibold text-slate-900">Breathing exercise</h2>
        <p className="text-sm text-slate-600">
          Box breathing: in for 4, hold for 4, out for 4, hold for 4. Repeat for 4 rounds.
        </p>
        <button
          type="button"
          onClick={() => setBreathing((b) => !b)}
          className="w-full rounded-2xl border border-brand-600 px-4 py-3 font-semibold text-brand-700"
        >
          {breathing ? "Hide guide" : "Show guide"}
        </button>
        {breathing && (
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
            <li>Sit comfortably, shoulders relaxed</li>
            <li>Breathe in through your nose — 4 slow counts</li>
            <li>Hold — 4 counts</li>
            <li>Breathe out slowly — 4 counts</li>
            <li>Hold — 4 counts, then repeat 4 times</li>
          </ol>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <h2 className="font-semibold text-slate-900">Journal and confidence check</h2>
        <div>
          <label className="block text-sm text-slate-700 mb-1">Prompt</label>
          <select
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
          >
            {PROMPTS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          rows={3}
          placeholder="Write a few lines..."
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        />
        <div>
          <label className="block text-sm text-slate-700 mb-1">
            Confidence in your recovery: <span className="font-bold text-brand-700">{confidence}/10</span>
          </label>
          <input
            type="range"
            min={0}
            max={10}
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
        </div>
        <button
          type="button"
          onClick={save}
          className="w-full rounded-2xl bg-brand-600 px-4 py-3 font-semibold text-white"
        >
          {saved ? "Saved ✓" : "Save entry"}
        </button>
        {logs.length > 0 && (
          <p className="text-xs text-slate-500">{logs.length} entries saved on this device.</p>
        )}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        If distress feels severe, persistent, or unsafe — including thoughts of harming
        yourself — please reach out to a mental health professional, your doctor, or a crisis
        line in your country. You deserve proper support.
      </div>
    </div>
  );
}
