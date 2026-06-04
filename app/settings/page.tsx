"use client";

import { useState } from "react";
import { store } from "@/lib/store";
import { supabaseConfigured } from "@/lib/supabaseClient";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";

export default function SettingsPage() {
  const [cleared, setCleared] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Settings &amp; disclaimer</h1>

      <SafetyDisclaimer />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 text-sm text-slate-700">
        <h2 className="font-semibold text-slate-900">What RehabOS is</h2>
        <p>
          RehabOS provides education, structured exercise guidance, red flag screening,
          progress tracking, and referral prompts. It uses predefined templates and rule-based
          matching — not AI-generated medical advice.
        </p>
        <h2 className="font-semibold text-slate-900 pt-2">What RehabOS is not</h2>
        <p>
          It does not diagnose, treat, prescribe, or replace a physiotherapist, doctor,
          psychologist, or dietitian. It never promises recovery timelines, guarantees
          outcomes, or declares you &quot;safe to play&quot;.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 text-sm text-slate-700">
        <h2 className="font-semibold text-slate-900">Your data</h2>
        <p>
          {supabaseConfigured()
            ? "Cloud sync is configured. Your logs are stored under your account with row level security."
            : "Your data is stored on this device only (no account needed). Clearing it cannot be undone."}
        </p>
        <button
          type="button"
          onClick={() => {
            store.clearAll();
            setCleared(true);
          }}
          className="mt-2 w-full rounded-2xl border border-red-300 px-4 py-3 font-semibold text-red-700 hover:bg-red-50"
        >
          {cleared ? "Data cleared" : "Clear all my data on this device"}
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">RehabOS MVP · Educational use only</p>
    </div>
  );
}
