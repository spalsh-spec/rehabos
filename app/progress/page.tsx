"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProgressChart from "@/components/ProgressChart";
import { store } from "@/lib/store";
import { shouldProgress, shouldRegress } from "@/lib/safetyRules";
import { DailyCheckIn } from "@/lib/types";

export default function ProgressPage() {
  const [checkins, setCheckins] = useState<DailyCheckIn[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCheckins(store.loadCheckIns());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const last = checkins[checkins.length - 1];
  const progressReady = shouldProgress(checkins);
  const regressNeeded = shouldRegress(checkins);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Your progress</h1>
        <p className="mt-1 text-sm text-slate-600">
          {checkins.length} check-in{checkins.length === 1 ? "" : "s"} recorded on this device.
        </p>
      </div>

      <ProgressChart checkins={checkins} />

      {last && (
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Latest pain" value={`${last.pain}/10`} good={last.pain <= 3} />
          <Stat label="Movement" value={`${last.rangeOfMotion}/10`} good={last.rangeOfMotion >= 7} />
          <Stat label="Confidence" value={`${last.confidence}/10`} good={last.confidence >= 7} />
          <Stat label="Activity" value={`${last.activityLevel}/10`} good={last.activityLevel >= 5} />
        </div>
      )}

      {regressNeeded && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          Your recent check-ins show a step backwards. Reduce difficulty or volume. If this
          continues, seek professional advice.
        </div>
      )}
      {!regressNeeded && progressReady && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          Your last three check-ins look steady: low pain, no flare ups, confidence holding.
          Consider progressing if your plan&apos;s progression criteria are all met.
        </div>
      )}
      {!regressNeeded && !progressReady && checkins.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          Keep checking in daily. Progression suggestions appear after three steady check-ins.
        </div>
      )}

      <Link
        href="/checkin"
        className="block w-full rounded-2xl bg-brand-600 px-4 py-4 text-center text-base font-semibold text-white hover:bg-brand-700"
      >
        New check-in
      </Link>
    </div>
  );
}

function Stat({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`text-xl font-bold ${good ? "text-emerald-600" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}
