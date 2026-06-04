export const SPORTS = [
  "Cricket",
  "Soccer",
  "AFL",
  "Rugby",
  "Basketball",
  "Running",
  "Tennis",
  "Gym training",
  "Martial arts",
  "General fitness",
] as const;
export type Sport = (typeof SPORTS)[number];

export const BODY_AREAS = [
  "Neck",
  "Shoulder",
  "Elbow",
  "Wrist",
  "Lower back",
  "Hip",
  "Groin",
  "Hamstring",
  "Quadriceps",
  "Knee",
  "Calf",
  "Achilles",
  "Ankle",
  "Foot",
] as const;
export type BodyArea = (typeof BODY_AREAS)[number];

export type SwellingLevel = "none" | "mild" | "moderate" | "severe";
export type Difficulty = "gentle" | "standard" | "challenging";

export interface IntakeData {
  sport: Sport;
  bodyArea: BodyArea;
  mechanism: string;
  painScore: number; // 0-10
  swelling: SwellingLevel;
  bruising: boolean;
  canBearWeight: boolean;
  canMoveJoint: boolean;
  numbnessTingling: boolean;
  weakness: boolean;
  instability: boolean;
  visibleDeformity: boolean;
  suspectedFracture: boolean;
  headInjurySymptoms: boolean;
  chestPain: boolean;
  breathingDifficulty: boolean;
  feverOrInfectionSigns: boolean;
  worseningSymptoms: boolean;
  calfSwellingOrShortBreath: boolean;
  dateOfInjury: string; // ISO date
  previousInjuries: string;
  trainingGoal: string;
  equipment: string[];
  timePerDay: number; // minutes
  preferredDifficulty: Difficulty;
}

export interface RedFlagResult {
  blocked: boolean;
  flags: string[];
  checkedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  bodyArea: BodyArea;
  purpose: string;
  difficulty: 1 | 2 | 3;
  equipment: string[];
  instructions: string[];
  commonMistakes: string[];
  safetyNotes: string;
  progression: string;
  regression: string;
  videoUrl: string; // placeholder
  imageUrl: string; // placeholder
  sports: Sport[];
}

export interface PhasePrescription {
  exerciseId: string;
  sets: string;
  reps: string;
  tempo: string;
  rest: string;
}

export interface RehabPhase {
  number: 1 | 2 | 3 | 4 | 5;
  name: string;
  goal: string;
  doNotDo: string[];
  exercises: PhasePrescription[];
  frequency: string;
  painRule: string;
  progressionCriteria: string[];
  regressionCriteria: string[];
  whenToSeekHelp: string;
}

export interface RehabPathway {
  id: string;
  name: string;
  bodyArea: BodyArea;
  description: string;
  phases: RehabPhase[];
  returnToSportTest: string[];
}

export interface GeneratedPlan {
  pathwayId: string;
  pathwayName: string;
  isApproximateMatch: boolean;
  matchNote: string;
  currentPhase: number;
  sport: Sport;
  bodyArea: BodyArea;
  frequency: string;
  warningSigns: string[];
  returnChecklist: string[];
  createdAt: string;
}

export interface DailyCheckIn {
  date: string;
  pain: number; // 0-10
  rangeOfMotion: number; // 0-10 self-rated
  confidence: number; // 0-10
  activityLevel: number; // 0-10
  nextDayFlareUp: boolean;
  notes: string;
}

export interface MentalLog {
  date: string;
  confidenceScore: number; // 0-10
  journalEntry: string;
  prompt: string;
}

export type EvidenceCategory =
  | "Higher evidence for general sport recovery"
  | "Limited evidence"
  | "Insufficient evidence"
  | "Potentially risky"
  | "Need professional advice";

export interface SupplementArticle {
  id: string;
  title: string;
  category: EvidenceCategory;
  summary: string;
  keyPoints: string[];
  cautions: string[];
  regulatoryStatus: string; // ARTG / local regulatory placeholder
}
