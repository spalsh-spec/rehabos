"use client";

import { DailyCheckIn, GeneratedPlan, IntakeData, MentalLog, RedFlagResult } from "./types";

/**
 * Local-first storage layer. Data persists on the device (localStorage) so the
 * core flow works without an account. When Supabase env vars are configured,
 * the same shapes map onto the SQL schema in /supabase/schema.sql.
 */

const KEYS = {
  intake: "rehabos_intake",
  redFlag: "rehabos_redflag",
  plan: "rehabos_plan",
  checkins: "rehabos_checkins",
  mental: "rehabos_mental",
} as const;

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked — fail silently, UI still works for the session
  }
}

export const store = {
  saveIntake: (d: IntakeData) => write(KEYS.intake, d),
  loadIntake: () => read<IntakeData>(KEYS.intake),
  saveRedFlag: (r: RedFlagResult) => write(KEYS.redFlag, r),
  loadRedFlag: () => read<RedFlagResult>(KEYS.redFlag),
  savePlan: (p: GeneratedPlan) => write(KEYS.plan, p),
  loadPlan: () => read<GeneratedPlan>(KEYS.plan),
  saveCheckIns: (c: DailyCheckIn[]) => write(KEYS.checkins, c),
  loadCheckIns: () => read<DailyCheckIn[]>(KEYS.checkins) ?? [],
  addCheckIn: (c: DailyCheckIn) => {
    const all = read<DailyCheckIn[]>(KEYS.checkins) ?? [];
    all.push(c);
    write(KEYS.checkins, all);
  },
  loadMentalLogs: () => read<MentalLog[]>(KEYS.mental) ?? [],
  addMentalLog: (m: MentalLog) => {
    const all = read<MentalLog[]>(KEYS.mental) ?? [];
    all.push(m);
    write(KEYS.mental, all);
  },
  clearAll: () => {
    if (typeof window === "undefined") return;
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  },
};
