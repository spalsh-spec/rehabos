import { PAIN_RULE } from "./safetyRules";
import { sportReturnChecklist } from "./sportMappings";
import {
  BodyArea,
  GeneratedPlan,
  IntakeData,
  PhasePrescription,
  RehabPathway,
  RehabPhase,
} from "./types";

const PHASE_NAMES: Record<number, string> = {
  1: "Calm and protect",
  2: "Restore movement",
  3: "Build strength",
  4: "Return to sport",
  5: "Prevent recurrence",
};

function rx(exerciseId: string, sets = "2-3", reps = "8-12", tempo = "Slow and controlled", rest = "30-60s"): PhasePrescription {
  return { exerciseId, sets, reps, tempo, rest };
}

interface PhaseSeed {
  goal: string;
  doNotDo: string[];
  exercises: PhasePrescription[];
  frequency?: string;
  progressionCriteria?: string[];
  regressionCriteria?: string[];
  whenToSeekHelp?: string;
}

const DEFAULT_PROGRESS = [
  "Pain stays 0 to 3 during and after sessions",
  "No next day worsening",
  "Movement confidence improving",
  "Daily function improving",
];
const DEFAULT_REGRESS = [
  "Pain increases",
  "Swelling increases",
  "Function decreases",
  "New symptoms appear",
  "You feel instability",
];
const DEFAULT_HELP =
  "Seek a health professional if pain is severe, symptoms worsen over 1-2 weeks despite easing off, or new symptoms like numbness, weakness, or fever appear.";

function phase(n: 1 | 2 | 3 | 4 | 5, seed: PhaseSeed): RehabPhase {
  return {
    number: n,
    name: PHASE_NAMES[n],
    goal: seed.goal,
    doNotDo: seed.doNotDo,
    exercises: seed.exercises,
    frequency: seed.frequency ?? "Once daily, or every second day if sore",
    painRule: PAIN_RULE,
    progressionCriteria: seed.progressionCriteria ?? DEFAULT_PROGRESS,
    regressionCriteria: seed.regressionCriteria ?? DEFAULT_REGRESS,
    whenToSeekHelp: seed.whenToSeekHelp ?? DEFAULT_HELP,
  };
}

export const PATHWAYS: RehabPathway[] = [
  {
    id: "ankle-sprain",
    name: "Ankle sprain pathway",
    bodyArea: "Ankle",
    description: "General guidance for a typical rolled ankle without red flags.",
    returnToSportTest: ["Hop and stick on the injured side feels equal to the other side", "Change of direction drills tolerated"],
    phases: [
      phase(1, { goal: "Settle swelling and protect the ankle while keeping gentle movement", doNotDo: ["Forcing painful range", "Hopping or running", "Deep massage over swollen areas"], exercises: [rx("ankle-circles", "2", "10 each direction"), rx("ankle-alphabet", "2", "1 alphabet"), rx("towel-scrunches", "2", "10-15")] }),
      phase(2, { goal: "Restore full comfortable movement and early balance", doNotDo: ["Running or cutting", "Unstable surfaces without support"], exercises: [rx("ankle-dorsiflexion-rock", "2", "10-12"), rx("calf-raises", "2-3", "10-12"), rx("single-leg-balance", "3", "20-30s holds")] }),
      phase(3, { goal: "Rebuild strength and single leg control", doNotDo: ["Maximal sprinting", "Competitive play"], exercises: [rx("single-leg-calf-raise", "3", "8-12"), rx("banded-ankle-eversion", "3", "12-15"), rx("heel-walks", "2", "20 steps"), rx("step-downs", "3", "8-10")] }),
      phase(4, { goal: "Reintroduce impact and sport movement gradually", doNotDo: ["Full competition before drills feel easy"], exercises: [rx("hop-and-stick", "3", "5 each leg"), rx("low-pogo-hops", "3", "15-20"), rx("monster-walks", "3", "10 steps each way")] }),
      phase(5, { goal: "Keep the ankle resilient and reduce re-sprain risk", doNotDo: ["Dropping balance work entirely once back playing"], exercises: [rx("single-leg-balance", "3", "30s eyes closed"), rx("single-leg-calf-raise", "3", "10-15"), rx("hop-and-stick", "2", "5 each leg")], frequency: "2-3 times per week ongoing" }),
    ],
  },
  {
    id: "hamstring-strain",
    name: "Hamstring strain pathway",
    bodyArea: "Hamstring",
    description: "General guidance for a typical hamstring strain from sprinting or kicking.",
    returnToSportTest: ["Progressive sprint build-ups to near full speed without tightness", "Kicking drills tolerated where relevant"],
    phases: [
      phase(1, { goal: "Settle the muscle while avoiding aggressive stretching", doNotDo: ["Aggressive stretching", "Sprinting", "Painful testing of the muscle"], exercises: [rx("hamstring-isometric-bridge", "3", "10-20s holds"), rx("glute-bridge", "2-3", "10-12"), rx("dead-bug", "2", "8 each side")] }),
      phase(2, { goal: "Restore comfortable movement and early loading", doNotDo: ["Maximal sprinting", "Ballistic stretching"], exercises: [rx("glute-bridge-march", "3", "8 each side"), rx("single-leg-rdl-regression", "3", "8 each side"), rx("bird-dog", "2", "8 each side")] }),
      phase(3, { goal: "Build hamstring strength through range", doNotDo: ["All-out sprints", "Competitive play"], exercises: [rx("hamstring-slider-curl", "3", "6-10"), rx("nordic-regression", "3", "4-6 slow"), rx("reverse-lunge", "3", "8 each side")] }),
      phase(4, { goal: "Progressive running and sport drills", doNotDo: ["Skipping the gradual sprint build-up"], exercises: [rx("nordic-regression", "3", "5-8"), rx("single-leg-rdl-regression", "3", "8 each side"), rx("low-pogo-hops", "3", "15-20")] }),
      phase(5, { goal: "Maintain hamstring strength to reduce recurrence", doNotDo: ["Stopping strength work after return"], exercises: [rx("nordic-regression", "2-3", "5-8"), rx("hamstring-slider-curl", "2", "8-10")], frequency: "1-2 times per week ongoing" }),
    ],
  },
  {
    id: "patellofemoral-knee",
    name: "Patellofemoral knee pain pathway",
    bodyArea: "Knee",
    description: "General guidance for pain around the kneecap with stairs, squats, or running.",
    returnToSportTest: ["Step downs and squats feel even and comfortable", "Graded return to running or jumping tolerated"],
    phases: [
      phase(1, { goal: "Calm the knee by trimming aggravating load, not stopping everything", doNotDo: ["Deep painful squats", "Big jumps in running volume", "Kneeling on hard ground if sore"], exercises: [rx("quad-isometric", "3", "10s holds x 8"), rx("glute-bridge", "2-3", "10-12"), rx("clamshell", "2", "12-15 each side")] }),
      phase(2, { goal: "Reload the knee through comfortable range", doNotDo: ["Pushing through sharp kneecap pain"], exercises: [rx("wall-sit", "3", "20-40s"), rx("terminal-knee-extension", "3", "12-15"), rx("side-lying-hip-abduction", "2", "12-15 each side")] }),
      phase(3, { goal: "Build leg and hip strength for stairs, squats and running", doNotDo: ["Maximal plyometrics"], exercises: [rx("spanish-squat", "3", "8-12"), rx("step-downs", "3", "8-10 each side"), rx("monster-walks", "3", "10 steps each way"), rx("box-squat", "3", "8-12")] }),
      phase(4, { goal: "Return to impact and sport gradually", doNotDo: ["Doubling training volume in one week"], exercises: [rx("reverse-lunge", "3", "8 each side"), rx("hop-and-stick", "3", "5 each leg"), rx("low-pogo-hops", "3", "15-20")] }),
      phase(5, { goal: "Keep hips and quads strong to protect the kneecap", doNotDo: ["Letting strength work lapse during the season"], exercises: [rx("spanish-squat", "2-3", "8-12"), rx("step-downs", "2", "10 each side")], frequency: "2 times per week ongoing" }),
    ],
  },
  {
    id: "calf-strain",
    name: "Calf strain pathway",
    bodyArea: "Calf",
    description: "General guidance for a typical calf muscle strain.",
    returnToSportTest: ["Progressive run build-up without tightness", "Repeated single leg calf raises feel equal both sides"],
    phases: [
      phase(1, { goal: "Protect the calf and begin gentle pain free loading", doNotDo: ["Stretching aggressively", "Running or jumping", "Pushing into sharp pain"], exercises: [rx("ankle-circles", "2", "10 each direction"), rx("seated-soleus-raise", "3", "12-15"), rx("towel-scrunches", "2", "10-15")] }),
      phase(2, { goal: "Restore calf strength through range", doNotDo: ["Sprinting", "Hill running"], exercises: [rx("calf-raises", "3", "10-15"), rx("ankle-dorsiflexion-rock", "2", "10-12"), rx("single-leg-balance", "3", "20-30s")] }),
      phase(3, { goal: "Build single leg calf capacity", doNotDo: ["Maximal jumping"], exercises: [rx("single-leg-calf-raise", "3", "8-12"), rx("toe-walks", "2", "20 steps"), rx("step-downs", "3", "8-10")] }),
      phase(4, { goal: "Reintroduce spring and running gradually", doNotDo: ["Returning to full speed in the first week back"], exercises: [rx("low-pogo-hops", "3", "15-20"), rx("hop-and-stick", "3", "5 each leg"), rx("single-leg-calf-raise", "3", "10-15")] }),
      phase(5, { goal: "Maintain calf strength and spring", doNotDo: ["Dropping calf work once running feels normal"], exercises: [rx("single-leg-calf-raise", "3", "12-15"), rx("low-pogo-hops", "2", "20")], frequency: "2 times per week ongoing" }),
    ],
  },
  {
    id: "achilles-irritation",
    name: "Achilles irritation pathway",
    bodyArea: "Achilles",
    description: "General guidance for gradual-onset Achilles tendon irritation. Sudden snap or pop needs professional review first.",
    returnToSportTest: ["Morning stiffness settled to a few minutes or less", "Graded hop and run program tolerated"],
    phases: [
      phase(1, { goal: "Reduce irritating load while keeping the tendon working with isometrics", doNotDo: ["Hill sprints and jumping", "Stretching the tendon hard into pain", "Complete rest for weeks"], exercises: [rx("seated-soleus-raise", "3", "12-15"), rx("calf-raises", "3", "10-12", "3s up, 3s down"), rx("single-leg-balance", "3", "20-30s")] }),
      phase(2, { goal: "Build tendon tolerance with slow heavy-feeling work", doNotDo: ["Bouncy impact work yet"], exercises: [rx("eccentric-heel-drop", "3", "8-12 slow"), rx("seated-soleus-raise", "3", "12-15"), rx("ankle-dorsiflexion-rock", "2", "10")] }),
      phase(3, { goal: "Increase single leg strength and capacity", doNotDo: ["Big spikes in walking or running volume"], exercises: [rx("single-leg-calf-raise", "3", "8-12 slow"), rx("eccentric-heel-drop", "3", "10-12"), rx("step-downs", "2", "8-10")] }),
      phase(4, { goal: "Reintroduce spring, hopping, and graded running", doNotDo: ["Consecutive hard impact days"], exercises: [rx("low-pogo-hops", "3", "15-20"), rx("single-leg-calf-raise", "3", "10-15"), rx("hop-and-stick", "3", "5 each leg")] }),
      phase(5, { goal: "Keep the tendon robust with ongoing calf strength", doNotDo: ["Sudden return to old training volume after time off"], exercises: [rx("single-leg-calf-raise", "3", "12-15"), rx("eccentric-heel-drop", "2", "10-12")], frequency: "2-3 times per week ongoing" }),
    ],
  },
  {
    id: "groin-strain",
    name: "Groin strain pathway",
    bodyArea: "Groin",
    description: "General guidance for a typical adductor (inner thigh) strain from kicking or change of direction.",
    returnToSportTest: ["Copenhagen holds feel strong and equal", "Kicking and cutting drills tolerated at building intensity"],
    phases: [
      phase(1, { goal: "Settle the groin with gentle squeezes and trunk work", doNotDo: ["Kicking", "Sprinting and cutting", "Forcing stretches"], exercises: [rx("adductor-ball-squeeze", "3", "8 x 5-10s holds"), rx("glute-bridge", "2-3", "10-12"), rx("dead-bug", "2", "8 each side")] }),
      phase(2, { goal: "Restore comfortable movement and early strength", doNotDo: ["Explosive change of direction"], exercises: [rx("adductor-ball-squeeze", "3", "8 x 10s firm"), rx("lateral-lunge", "3", "6-8 each side"), rx("side-plank", "3", "15-20s")] }),
      phase(3, { goal: "Build groin strength for sport", doNotDo: ["Full kicking power"], exercises: [rx("copenhagen-regression", "3", "5 x 10s holds"), rx("lateral-lunge", "3", "8-10 each side"), rx("monster-walks", "3", "10 steps each way")] }),
      phase(4, { goal: "Reintroduce kicking, cutting, and sprinting gradually", doNotDo: ["Maximal kicks before building up"], exercises: [rx("copenhagen-regression", "3", "6-8 reps"), rx("hop-and-stick", "3", "5 each leg"), rx("reverse-lunge", "3", "8 each side")] }),
      phase(5, { goal: "Maintain adductor strength across the season", doNotDo: ["Stopping Copenhagen work once symptom free"], exercises: [rx("copenhagen-regression", "2-3", "6-8"), rx("lateral-lunge", "2", "8 each side")], frequency: "1-2 times per week ongoing" }),
    ],
  },
  {
    id: "rotator-cuff-irritation",
    name: "Shoulder rotator cuff irritation pathway",
    bodyArea: "Shoulder",
    description: "General guidance for gradual-onset shoulder pain with overhead or throwing activity.",
    returnToSportTest: ["Overhead movements comfortable and strong", "Graded throwing or serving build-up tolerated"],
    phases: [
      phase(1, { goal: "Calm the shoulder while keeping it gently active", doNotDo: ["Heavy overhead pressing", "Throwing", "Sleeping positions that clearly flare it (adjust pillows)"], exercises: [rx("shoulder-isometric-er", "3", "8 x 5-10s"), rx("scapular-wall-slide", "2", "10-12"), rx("chin-tucks", "2", "8-10")] }),
      phase(2, { goal: "Restore comfortable movement and cuff activation", doNotDo: ["Pushing into pinching pain"], exercises: [rx("band-external-rotation", "3", "12-15"), rx("scapular-wall-slide", "3", "10-12"), rx("band-row", "3", "12-15")] }),
      phase(3, { goal: "Build cuff and shoulder blade strength", doNotDo: ["Maximal throwing or heavy overhead work"], exercises: [rx("band-external-rotation", "3", "10-12 slower"), rx("prone-y-raise", "3", "10-12"), rx("push-up-plus", "3", "8-12"), rx("band-row", "3", "10-12")] }),
      phase(4, { goal: "Graded return to overhead and throwing load", doNotDo: ["Full-effort throwing without a build-up"], exercises: [rx("prone-y-raise", "3", "10-12"), rx("push-up-plus", "3", "10-12"), rx("band-external-rotation", "3", "12-15")] }),
      phase(5, { goal: "Keep the cuff strong for overhead sport", doNotDo: ["Dropping cuff work in season"], exercises: [rx("band-external-rotation", "2-3", "12-15"), rx("band-row", "2", "12-15")], frequency: "2 times per week ongoing" }),
    ],
  },
  {
    id: "lower-back-strain",
    name: "Lower back general strain pathway",
    bodyArea: "Lower back",
    description: "General guidance for simple lower back strain without leg symptoms. Leg numbness, weakness, or changes to bladder or bowel control need urgent medical care.",
    returnToSportTest: ["Daily activities and lifting comfortable", "Sport movements tolerated at building intensity"],
    phases: [
      phase(1, { goal: "Stay gently active and reduce fear — bed rest slows recovery", doNotDo: ["Prolonged bed rest", "Heavy lifting", "Movements that sharply spike pain"], exercises: [rx("cat-cow", "2-3", "8-10 slow"), rx("glute-max-isometric", "3", "8 x 5-10s"), rx("dead-bug", "2", "6-8 each side")] }),
      phase(2, { goal: "Restore comfortable movement and trunk control", doNotDo: ["Maximal lifting"], exercises: [rx("bird-dog", "3", "8 each side"), rx("glute-bridge", "3", "10-12"), rx("side-plank", "2-3", "15-20s")] }),
      phase(3, { goal: "Build trunk and hip strength for sport and lifting", doNotDo: ["Big jumps in training load"], exercises: [rx("front-plank", "3", "20-40s"), rx("pallof-press", "3", "10-12 each side"), rx("box-squat", "3", "8-12"), rx("single-leg-rdl-regression", "3", "8 each side")] }),
      phase(4, { goal: "Return to sport movements and progressive load", doNotDo: ["Skipping the gradual build-up to heavy lifts"], exercises: [rx("pallof-press", "3", "10-12"), rx("reverse-lunge", "3", "8 each side"), rx("front-plank", "3", "30-45s")] }),
      phase(5, { goal: "Keep the trunk and hips strong to reduce flare-ups", doNotDo: ["Long sitting streaks without movement breaks"], exercises: [rx("bird-dog", "2", "10 each side"), rx("side-plank", "2", "20-30s"), rx("glute-bridge", "2", "12-15")], frequency: "2-3 times per week ongoing" }),
    ],
  },
  {
    id: "wrist-sprain",
    name: "Wrist sprain pathway",
    bodyArea: "Wrist",
    description: "General guidance for a mild wrist sprain. Significant fall on an outstretched hand with point tenderness should be checked for fracture first.",
    returnToSportTest: ["Weight bearing through the hand (push up position) comfortable", "Grip strength feels near equal both sides"],
    phases: [
      phase(1, { goal: "Protect the wrist and keep fingers and forearm moving", doNotDo: ["Weight bearing through the hand", "Forcing painful range"], exercises: [rx("grip-squeeze", "3", "8-10 gentle"), rx("forearm-rotations", "2", "10 slow"), rx("wrist-flexion-isometric", "3", "5 x 10s")] }),
      phase(2, { goal: "Restore comfortable wrist movement", doNotDo: ["Heavy gripping or lifting"], exercises: [rx("forearm-rotations", "3", "10-12"), rx("wrist-flexion-isometric", "3", "8 x 10s"), rx("wrist-extension-isometric", "3", "5 x 10s")] }),
      phase(3, { goal: "Rebuild wrist and grip strength", doNotDo: ["Maximal lifts or impact through the hand"], exercises: [rx("wrist-curls-light", "3", "10-12"), rx("eccentric-wrist-extension", "3", "8-10"), rx("grip-squeeze", "3", "10-12 firm")] }),
      phase(4, { goal: "Return to sport-specific hand loading gradually", doNotDo: ["Full contact or max gripping without build-up"], exercises: [rx("push-up-plus", "3", "6-10 from knees first"), rx("wrist-curls-light", "3", "10-12"), rx("forearm-rotations", "3", "10-12 with light stick")] }),
      phase(5, { goal: "Maintain wrist and grip strength", doNotDo: ["Ignoring early niggles on return"], exercises: [rx("wrist-curls-light", "2", "10-12"), rx("grip-squeeze", "2", "10-12")], frequency: "2 times per week ongoing" }),
    ],
  },
  {
    id: "tennis-elbow",
    name: "Tennis elbow style irritation pathway",
    bodyArea: "Elbow",
    description: "General guidance for gradual-onset outer elbow pain with gripping or racquet sports.",
    returnToSportTest: ["Gripping and racquet drills comfortable at building intensity", "No next day flare after practice sessions"],
    phases: [
      phase(1, { goal: "Calm the tendon with isometrics and trim aggravating grip load", doNotDo: ["Heavy gripping", "Painful repetitive wrist work", "Complete rest for weeks"], exercises: [rx("wrist-extension-isometric", "4", "5 x 10-30s"), rx("grip-squeeze", "2", "8-10 very gentle"), rx("forearm-rotations", "2", "10 slow")] }),
      phase(2, { goal: "Begin slow strengthening through range", doNotDo: ["Fast or jerky wrist movements"], exercises: [rx("eccentric-wrist-extension", "3", "8-10 slow"), rx("wrist-extension-isometric", "3", "5 x 15s"), rx("band-row", "2", "12-15")] }),
      phase(3, { goal: "Build forearm and shoulder strength to share the load", doNotDo: ["Long unbroken racquet sessions"], exercises: [rx("eccentric-wrist-extension", "3", "10-12"), rx("wrist-curls-light", "3", "10-12"), rx("band-external-rotation", "3", "12-15"), rx("grip-squeeze", "3", "10 firm")] }),
      phase(4, { goal: "Graded return to racquet or grip-heavy sport", doNotDo: ["Returning to full session length immediately"], exercises: [rx("eccentric-wrist-extension", "3", "10-12"), rx("forearm-rotations", "3", "10-12 with stick"), rx("band-row", "3", "12-15")] }),
      phase(5, { goal: "Maintain forearm strength to prevent recurrence", doNotDo: ["Dropping forearm work once pain free"], exercises: [rx("eccentric-wrist-extension", "2", "10-12"), rx("wrist-curls-light", "2", "10-12")], frequency: "2 times per week ongoing" }),
    ],
  },
];

/** Closest-match table for areas without a dedicated seeded pathway. */
const APPROXIMATE_MATCH: Partial<Record<BodyArea, { pathwayId: string; note: string }>> = {
  Foot: { pathwayId: "ankle-sprain", note: "No dedicated foot pathway yet. The ankle pathway is the closest general guidance — treat it as approximate and consider a professional assessment." },
  Quadriceps: { pathwayId: "hamstring-strain", note: "No dedicated quadriceps pathway yet. General thigh strain principles from the hamstring pathway apply approximately — consider a professional assessment." },
  Hip: { pathwayId: "groin-strain", note: "No dedicated hip pathway yet. The groin pathway covers nearby muscles approximately — consider a professional assessment." },
};

export function findPathway(area: BodyArea): { pathway: RehabPathway | null; isApproximate: boolean; note: string } {
  const exact = PATHWAYS.find((p) => p.bodyArea === area);
  if (exact) return { pathway: exact, isApproximate: false, note: "" };
  const approx = APPROXIMATE_MATCH[area];
  if (approx) {
    const pathway = PATHWAYS.find((p) => p.id === approx.pathwayId) ?? null;
    return { pathway, isApproximate: true, note: approx.note };
  }
  return {
    pathway: null,
    isApproximate: true,
    note:
      "We do not have a structured pathway for this area yet. This area is sensitive and self-guided rehab guidance here would be uncertain. Please see a qualified health professional. You can still browse the exercise library for general education.",
  };
}

function daysSince(dateISO: string): number {
  const then = new Date(dateISO).getTime();
  if (Number.isNaN(then)) return 0;
  return Math.max(0, Math.floor((Date.now() - then) / 86400000));
}

/** Deterministic phase selection — conservative by design. */
export function selectPhase(intake: IntakeData): number {
  const days = daysSince(intake.dateOfInjury);
  let p: number;
  if (days < 7) p = 1;
  else if (days < 21) p = 2;
  else if (days < 42) p = 3;
  else if (days < 70) p = 4;
  else p = 5;

  // Conservative caps based on current symptoms
  if (intake.painScore >= 6) p = Math.min(p, 1);
  else if (intake.painScore >= 4) p = Math.min(p, 2);
  if (intake.swelling === "severe") p = Math.min(p, 1);
  else if (intake.swelling === "moderate") p = Math.min(p, 2);
  if (!intake.canMoveJoint) p = Math.min(p, 1);
  if (intake.instability) p = Math.min(p, 2);
  return p;
}

export const WARNING_SIGNS = [
  "Pain rising above 5 out of 10 during or after exercise",
  "Pain clearly worse the next day",
  "Increasing swelling",
  "New numbness, tingling, or weakness",
  "A feeling of giving way or instability",
  "Fever or feeling unwell",
];

export function generatePlan(intake: IntakeData): GeneratedPlan | null {
  const { pathway, isApproximate, note } = findPathway(intake.bodyArea);
  if (!pathway) return null;
  const currentPhase = selectPhase(intake);
  const freq =
    intake.timePerDay >= 30
      ? "Once daily"
      : intake.timePerDay >= 15
        ? "Once daily (short session)"
        : "Short session daily, or split across the day";
  return {
    pathwayId: pathway.id,
    pathwayName: pathway.name,
    isApproximateMatch: isApproximate,
    matchNote: note,
    currentPhase,
    sport: intake.sport,
    bodyArea: intake.bodyArea,
    frequency: freq,
    warningSigns: WARNING_SIGNS,
    returnChecklist: sportReturnChecklist(intake.sport),
    createdAt: new Date().toISOString(),
  };
}

export function getPathway(id: string): RehabPathway | undefined {
  return PATHWAYS.find((p) => p.id === id);
}
