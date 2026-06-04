import { BodyArea, Sport } from "./types";

export interface SportProfile {
  commonAreas: BodyArea[];
  demands: string[];
  concussionWarning: boolean;
}

export const SPORT_PROFILES: Record<Sport, SportProfile> = {
  Cricket: {
    commonAreas: ["Shoulder", "Lower back", "Hamstring", "Ankle", "Knee"],
    demands: ["Bowling load", "Throwing shoulder", "Sprinting", "Fielding dives"],
    concussionWarning: false,
  },
  Soccer: {
    commonAreas: ["Ankle", "Knee", "Groin", "Hamstring", "Calf"],
    demands: ["Cutting", "Kicking", "Sprinting", "Deceleration"],
    concussionWarning: false,
  },
  AFL: {
    commonAreas: ["Hamstring", "Shoulder", "Knee", "Ankle"],
    demands: ["Sprinting", "Tackling", "Jumping", "Contact"],
    concussionWarning: true,
  },
  Rugby: {
    commonAreas: ["Shoulder", "Neck", "Knee", "Ankle"],
    demands: ["Contact", "Tackling", "Scrums", "Collisions"],
    concussionWarning: true,
  },
  Basketball: {
    commonAreas: ["Ankle", "Knee", "Calf", "Achilles", "Wrist"],
    demands: ["Jumping", "Landing", "Cutting", "Deceleration"],
    concussionWarning: false,
  },
  Running: {
    commonAreas: ["Knee", "Calf", "Achilles", "Hamstring", "Foot"],
    demands: ["Repetitive load", "Impact", "Endurance volume"],
    concussionWarning: false,
  },
  Tennis: {
    commonAreas: ["Elbow", "Shoulder", "Wrist", "Calf", "Knee"],
    demands: ["Racquet load", "Serving", "Lateral movement"],
    concussionWarning: false,
  },
  "Gym training": {
    commonAreas: ["Lower back", "Shoulder", "Knee", "Wrist", "Elbow"],
    demands: ["Lifting load", "Overhead pressing", "Squatting"],
    concussionWarning: false,
  },
  "Martial arts": {
    commonAreas: ["Wrist", "Shoulder", "Hip", "Groin", "Knee", "Ankle", "Neck"],
    demands: ["Kicking", "Grappling", "Impact", "Rotation"],
    concussionWarning: true,
  },
  "General fitness": {
    commonAreas: ["Lower back", "Knee", "Shoulder", "Ankle"],
    demands: ["Mixed training load"],
    concussionWarning: false,
  },
};

export function sportReturnChecklist(sport: Sport): string[] {
  const base = [
    "Pain controlled",
    "Full comfortable movement",
    "Strength feels near normal",
    "Can complete sport specific drills",
    "No next day flare up",
    "Confidence above threshold",
    "No red flags",
    "Consider a professional assessment before full return where possible",
  ];
  const drills: Partial<Record<Sport, string>> = {
    Cricket: "Gradual bowling or throwing build-up tolerated over 2+ sessions",
    Soccer: "Cutting, kicking and sprint drills tolerated at increasing intensity",
    AFL: "Sprinting, jumping and controlled contact drills tolerated",
    Rugby: "Controlled contact and tackling drills tolerated",
    Basketball: "Jumping, landing and change of direction drills tolerated",
    Running: "Graded return to running volume without symptoms",
    Tennis: "Serving and lateral movement drills tolerated",
    "Gym training": "Gradual load build-up on key lifts without symptoms",
    "Martial arts": "Kicking, grappling and rotation drills tolerated without symptoms",
    "General fitness": "Normal training sessions tolerated at reduced then full volume",
  };
  const d = drills[sport];
  return d ? [...base.slice(0, 4), d, ...base.slice(4)] : base;
}
