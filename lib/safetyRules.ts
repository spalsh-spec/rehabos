import { IntakeData, RedFlagResult } from "./types";

const LOWER_LIMB: string[] = [
  "Hip",
  "Groin",
  "Hamstring",
  "Quadriceps",
  "Knee",
  "Calf",
  "Achilles",
  "Ankle",
  "Foot",
];

/**
 * Deterministic red flag screening. Educational triage only — never a diagnosis.
 * Any single flag blocks self-guided rehab and routes the user to professional care.
 */
export function evaluateRedFlags(intake: IntakeData): RedFlagResult {
  const flags: string[] = [];

  if (intake.painScore > 8) {
    flags.push("Severe pain above 8 out of 10");
  }
  if (intake.visibleDeformity) {
    flags.push("Visible deformity at the injured area");
  }
  if (!intake.canBearWeight && LOWER_LIMB.includes(intake.bodyArea)) {
    flags.push("Unable to bear weight after a lower limb injury");
  }
  if (intake.numbnessTingling) {
    flags.push("Numbness or tingling");
  }
  if (intake.weakness) {
    flags.push("Major weakness");
  }
  if (intake.suspectedFracture) {
    flags.push("Suspected fracture");
  }
  if (intake.headInjurySymptoms) {
    flags.push("Head injury symptoms (possible concussion)");
  }
  if (intake.chestPain) {
    flags.push("Chest pain");
  }
  if (intake.breathingDifficulty) {
    flags.push("Breathing difficulty");
  }
  if (intake.feverOrInfectionSigns) {
    flags.push("Fever or signs of infection");
  }
  if (intake.worseningSymptoms) {
    flags.push("Symptoms are getting worse over time");
  }
  if (intake.calfSwellingOrShortBreath) {
    flags.push("Unexplained calf swelling or shortness of breath (possible clot — urgent)");
  }

  return {
    blocked: flags.length > 0,
    flags,
    checkedAt: new Date().toISOString(),
  };
}

export const STOP_MESSAGE =
  "Do not continue with self guided rehab. Seek medical care or contact a qualified health professional.";

export const PAIN_RULE =
  "During exercise pain should stay mild and manageable. Pain should not sharply increase. Pain should not be worse the next day. If pain increases significantly, reduce difficulty or stop and seek professional advice.";

/** Progression rules from check-in history. Deterministic, conservative. */
export function shouldProgress(checkins: { pain: number; nextDayFlareUp: boolean; confidence: number; activityLevel: number }[]): boolean {
  if (checkins.length < 3) return false;
  const recent = checkins.slice(-3);
  return recent.every(
    (c) => c.pain <= 3 && !c.nextDayFlareUp
  ) && recent[recent.length - 1].confidence >= recent[0].confidence
    && recent[recent.length - 1].activityLevel >= recent[0].activityLevel;
}

export function shouldRegress(checkins: { pain: number; nextDayFlareUp: boolean }[]): boolean {
  if (checkins.length < 2) return false;
  const [prev, last] = checkins.slice(-2);
  return last.pain > prev.pain + 2 || last.nextDayFlareUp;
}
