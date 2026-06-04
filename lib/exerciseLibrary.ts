import { BodyArea, Exercise, Sport } from "./types";

const ALL_SPORTS: Sport[] = [
  "Cricket", "Soccer", "AFL", "Rugby", "Basketball", "Running", "Tennis", "Gym training", "Martial arts", "General fitness",
];

const VIDEO = "https://placeholder.rehabos.example/video/";
const IMAGE = "https://placeholder.rehabos.example/image/";

interface Partial50 {
  id: string;
  name: string;
  bodyArea: BodyArea;
  purpose: string;
  difficulty: 1 | 2 | 3;
  equipment?: string[];
  instructions: string[];
  commonMistakes?: string[];
  safetyNotes?: string;
  progression?: string;
  regression?: string;
  sports?: Sport[];
}

function ex(p: Partial50): Exercise {
  return {
    id: p.id,
    name: p.name,
    bodyArea: p.bodyArea,
    purpose: p.purpose,
    difficulty: p.difficulty,
    equipment: p.equipment ?? ["None"],
    instructions: p.instructions,
    commonMistakes: p.commonMistakes ?? ["Rushing the movement", "Holding your breath"],
    safetyNotes:
      p.safetyNotes ??
      "Keep pain mild and manageable. Stop if pain sharply increases or symptoms worsen.",
    progression: p.progression ?? "Slowly add repetitions or hold time as it feels easier.",
    regression: p.regression ?? "Reduce range, repetitions, or hold time so it stays comfortable.",
    videoUrl: VIDEO + p.id,
    imageUrl: IMAGE + p.id,
    sports: p.sports ?? ALL_SPORTS,
  };
}

export const EXERCISES: Exercise[] = [
  // ---- Ankle / Foot ----
  ex({ id: "ankle-circles", name: "Ankle circles", bodyArea: "Ankle", purpose: "Restore gentle ankle movement early after injury", difficulty: 1,
    instructions: ["Sit with your leg supported", "Slowly draw circles with your foot", "Go both directions", "Stay within a comfortable range"],
    commonMistakes: ["Forcing range through pain", "Moving too fast"] }),
  ex({ id: "ankle-alphabet", name: "Ankle alphabet", bodyArea: "Ankle", purpose: "Improve ankle mobility in all directions", difficulty: 1,
    instructions: ["Sit with leg supported", "Trace the alphabet in the air with your big toe", "Keep movements slow and controlled"] }),
  ex({ id: "calf-raises", name: "Calf raises", bodyArea: "Calf", purpose: "Rebuild calf and ankle strength", difficulty: 2,
    instructions: ["Stand holding a stable support", "Rise up onto your toes", "Lower slowly over 3 seconds", "Use both legs"],
    progression: "Move toward single leg raises, then add a slow 5 second lower.",
    regression: "Do them seated, or use more support from your hands." }),
  ex({ id: "single-leg-calf-raise", name: "Single leg calf raise", bodyArea: "Calf", purpose: "Build single leg calf strength for running and jumping", difficulty: 3,
    instructions: ["Stand on one leg near support", "Rise onto your toes", "Lower slowly", "Keep your knee straight"],
    sports: ["Running", "Basketball", "Soccer", "AFL", "Tennis", "General fitness"] }),
  ex({ id: "seated-soleus-raise", name: "Seated soleus raise", bodyArea: "Calf", purpose: "Strengthen the deeper calf muscle with the knee bent", difficulty: 1,
    instructions: ["Sit with feet flat", "Place light weight on your knee if available", "Lift heels up and lower slowly"],
    equipment: ["None", "Optional weight"] }),
  ex({ id: "single-leg-balance", name: "Single leg balance", bodyArea: "Ankle", purpose: "Retrain balance and ankle control", difficulty: 1,
    instructions: ["Stand on one leg near support", "Hold up to 30 seconds", "Keep hips level", "Use fingertip support if needed"],
    progression: "Close your eyes or stand on a folded towel.",
    regression: "Hold light support with one hand." }),
  ex({ id: "towel-scrunches", name: "Towel scrunches", bodyArea: "Foot", purpose: "Activate small foot muscles", difficulty: 1,
    equipment: ["Towel"],
    instructions: ["Sit with foot on a towel", "Scrunch the towel toward you with your toes", "Relax and repeat"] }),
  ex({ id: "heel-walks", name: "Heel walks", bodyArea: "Ankle", purpose: "Strengthen the front of the shin and challenge balance", difficulty: 2,
    instructions: ["Lift your toes and walk on your heels", "Take short steps", "Stay near support"] }),
  ex({ id: "toe-walks", name: "Toe walks", bodyArea: "Calf", purpose: "Build calf endurance and ankle control", difficulty: 2,
    instructions: ["Rise onto your toes", "Walk forward with short steps", "Keep tall posture"] }),
  ex({ id: "banded-ankle-eversion", name: "Banded ankle eversion", bodyArea: "Ankle", purpose: "Strengthen the muscles that protect against ankle rolls", difficulty: 2,
    equipment: ["Resistance band"],
    instructions: ["Sit with band looped around your forefoot", "Turn your foot outward against the band", "Return slowly"] }),
  ex({ id: "hop-and-stick", name: "Hop and stick", bodyArea: "Ankle", purpose: "Late stage landing control before return to sport", difficulty: 3,
    instructions: ["Hop forward a short distance", "Land softly and hold still for 3 seconds", "Keep knee over toes"],
    safetyNotes: "Only attempt when walking, balance and strength feel comfortable. Keep pain mild. Stop if unstable.",
    sports: ["Basketball", "Soccer", "AFL", "Rugby", "Tennis", "Running", "Martial arts"] }),
  ex({ id: "low-pogo-hops", name: "Low pogo hops", bodyArea: "Calf", purpose: "Reintroduce gentle spring and impact for the calf and Achilles", difficulty: 3,
    instructions: ["Stand tall", "Perform small bouncy hops on both feet", "Stay quiet and springy", "Keep heels kissing the floor"],
    sports: ["Running", "Basketball", "Soccer", "AFL", "Tennis"] }),
  ex({ id: "eccentric-heel-drop", name: "Eccentric heel drop", bodyArea: "Achilles", purpose: "Load the Achilles tendon in a controlled way", difficulty: 2,
    equipment: ["Step"],
    instructions: ["Stand on a step on both toes", "Shift weight to one leg", "Lower the heel slowly below the step", "Use both legs to rise back up"],
    safetyNotes: "Mild discomfort that settles is acceptable. Sharp pain is not — stop and reassess." }),
  ex({ id: "ankle-dorsiflexion-rock", name: "Knee to wall rock", bodyArea: "Ankle", purpose: "Restore ankle bend for squatting and running", difficulty: 1,
    instructions: ["Stand facing a wall, foot a hand-width away", "Rock your knee toward the wall", "Keep your heel down", "Return and repeat"] }),
  ex({ id: "tibialis-raises", name: "Tibialis raises", bodyArea: "Ankle", purpose: "Strengthen the front of the shin for impact control", difficulty: 2,
    instructions: ["Lean back against a wall, feet forward", "Lift your toes toward your shins", "Lower slowly"] }),

  // ---- Knee / Quad ----
  ex({ id: "wall-sit", name: "Wall sit", bodyArea: "Knee", purpose: "Build quad strength with low joint stress", difficulty: 2,
    equipment: ["Wall"],
    instructions: ["Slide down a wall to a comfortable squat depth", "Hold 15 to 45 seconds", "Keep knees over ankles"],
    regression: "Stay higher up the wall and hold for less time." }),
  ex({ id: "spanish-squat", name: "Spanish squat", bodyArea: "Knee", purpose: "Strengthen quads while reducing kneecap stress", difficulty: 2,
    equipment: ["Heavy resistance band", "Pole or rack"],
    instructions: ["Loop a band behind your knees anchored in front", "Sit back into a squat keeping shins vertical", "Hold or repeat slowly"] }),
  ex({ id: "step-downs", name: "Step downs", bodyArea: "Knee", purpose: "Build single leg knee control on stairs and slopes", difficulty: 2,
    equipment: ["Step"],
    instructions: ["Stand on a low step", "Slowly lower the other heel toward the floor", "Keep your knee tracking over your toes", "Push back up"] }),
  ex({ id: "terminal-knee-extension", name: "Terminal knee extension", bodyArea: "Knee", purpose: "Activate the quad in the final part of straightening", difficulty: 1,
    equipment: ["Resistance band"],
    instructions: ["Loop a band behind your knee anchored in front", "Slowly straighten your knee against the band", "Control the return"] }),
  ex({ id: "sit-to-stand", name: "Sit to stand", bodyArea: "Knee", purpose: "Rebuild functional leg strength", difficulty: 1,
    equipment: ["Chair"],
    instructions: ["Sit on a firm chair", "Stand up without using your hands if comfortable", "Lower back down slowly"] }),
  ex({ id: "box-squat", name: "Box squat", bodyArea: "Knee", purpose: "Groove a safe squat pattern with a depth target", difficulty: 2,
    equipment: ["Chair or box"],
    instructions: ["Stand in front of a box", "Squat back until you lightly touch it", "Stand back up", "Keep heels down"] }),
  ex({ id: "reverse-lunge", name: "Reverse lunge", bodyArea: "Quadriceps", purpose: "Single leg strength with less knee stress than forward lunges", difficulty: 2,
    instructions: ["Step backward into a lunge", "Lower under control", "Push through the front heel to return"] }),
  ex({ id: "lateral-lunge", name: "Lateral lunge", bodyArea: "Groin", purpose: "Strength and control for sideways movement", difficulty: 2,
    instructions: ["Step sideways and sit into one hip", "Keep the other leg straight", "Push back to standing"],
    sports: ["Soccer", "Basketball", "Tennis", "AFL", "Martial arts", "General fitness"] }),
  ex({ id: "quad-isometric", name: "Quad set isometric", bodyArea: "Quadriceps", purpose: "Gentle early quad activation", difficulty: 1,
    instructions: ["Sit with leg straight", "Tighten the thigh and press the knee down", "Hold 5 to 10 seconds", "Relax and repeat"] }),

  // ---- Hamstring / Hip / Glute ----
  ex({ id: "glute-bridge", name: "Glute bridge", bodyArea: "Hip", purpose: "Activate glutes and unload the lower back", difficulty: 1,
    instructions: ["Lie on your back, knees bent", "Squeeze glutes and lift hips", "Lower slowly"] }),
  ex({ id: "glute-bridge-march", name: "Glute bridge march", bodyArea: "Hip", purpose: "Add single leg control to the bridge", difficulty: 2,
    instructions: ["Hold a bridge position", "Slowly lift one foot a few centimetres", "Keep hips level", "Alternate sides"] }),
  ex({ id: "hamstring-isometric-bridge", name: "Hamstring isometric bridge", bodyArea: "Hamstring", purpose: "Early hamstring loading with minimal movement", difficulty: 1,
    instructions: ["Lie on your back with heels on a chair", "Press heels down and lift hips slightly", "Hold 10 to 20 seconds"],
    equipment: ["Chair"] }),
  ex({ id: "hamstring-slider-curl", name: "Hamstring slider curl", bodyArea: "Hamstring", purpose: "Strengthen hamstrings through range", difficulty: 3,
    equipment: ["Sliders or towel on smooth floor"],
    instructions: ["Lie on your back, heels on sliders", "Bridge up", "Slowly slide heels away and back"],
    regression: "Only do the slide-out portion, lowering hips between reps." }),
  ex({ id: "nordic-regression", name: "Nordic curl regression", bodyArea: "Hamstring", purpose: "Build hamstring strength for sprinting sports", difficulty: 3,
    equipment: ["Partner or anchor for ankles", "Cushion"],
    instructions: ["Kneel with ankles anchored", "Lower your trunk forward as slowly as you can", "Use hands to catch and push back"],
    safetyNotes: "Expect strong effort but not sharp pain. Start with tiny ranges.",
    sports: ["AFL", "Soccer", "Rugby", "Cricket", "Running", "Basketball"] }),
  ex({ id: "single-leg-rdl-regression", name: "Single leg RDL regression", bodyArea: "Hamstring", purpose: "Hinge control and hamstring length under load", difficulty: 2,
    instructions: ["Stand on one leg with fingertip support", "Hinge forward with a flat back", "Reach toward the floor", "Return tall"] }),
  ex({ id: "clamshell", name: "Clamshell", bodyArea: "Hip", purpose: "Activate hip rotators that steady the knee", difficulty: 1,
    instructions: ["Lie on your side, knees bent", "Keep feet together and lift the top knee", "Lower slowly"] }),
  ex({ id: "side-lying-hip-abduction", name: "Side lying hip abduction", bodyArea: "Hip", purpose: "Strengthen outer hip for single leg control", difficulty: 1,
    instructions: ["Lie on your side, legs straight", "Lift the top leg slowly", "Keep toes facing forward"] }),
  ex({ id: "monster-walks", name: "Monster walks", bodyArea: "Hip", purpose: "Hip strength for cutting and landing", difficulty: 2,
    equipment: ["Resistance band"],
    instructions: ["Band around ankles or knees", "Quarter squat position", "Step sideways keeping tension"] }),
  ex({ id: "hip-airplane-regression", name: "Hip airplane regression", bodyArea: "Hip", purpose: "Advanced single leg hip control", difficulty: 3,
    equipment: ["Wall or chair for support"],
    instructions: ["Stand on one leg holding support", "Hinge forward", "Slowly rotate your pelvis open and closed"] }),
  ex({ id: "hip-flexor-stretch", name: "Half kneeling hip flexor stretch", bodyArea: "Hip", purpose: "Ease front-of-hip tightness", difficulty: 1,
    equipment: ["Cushion"],
    instructions: ["Half kneel with back knee on a cushion", "Tuck tailbone and shift gently forward", "Hold 20 to 30 seconds"] }),
  ex({ id: "adductor-ball-squeeze", name: "Adductor ball squeeze", bodyArea: "Groin", purpose: "Gentle early groin loading", difficulty: 1,
    equipment: ["Ball or pillow"],
    instructions: ["Lie with knees bent, ball between knees", "Squeeze gently 5 to 10 seconds", "Relax and repeat"] }),
  ex({ id: "copenhagen-regression", name: "Copenhagen plank regression", bodyArea: "Groin", purpose: "Build groin strength for kicking and cutting sports", difficulty: 3,
    equipment: ["Bench or chair"],
    instructions: ["Lie on your side with top knee on a bench", "Lift hips into a short side plank", "Hold briefly, lower with control"],
    sports: ["Soccer", "AFL", "Martial arts", "Rugby", "Basketball"] }),

  // ---- Trunk / Lower back ----
  ex({ id: "cat-cow", name: "Cat cow", bodyArea: "Lower back", purpose: "Gentle spinal movement to ease stiffness", difficulty: 1,
    instructions: ["Start on hands and knees", "Slowly round your back, then arch", "Move with your breath"] }),
  ex({ id: "bird-dog", name: "Bird dog", bodyArea: "Lower back", purpose: "Trunk control without spinal strain", difficulty: 2,
    instructions: ["On hands and knees", "Reach one arm and the opposite leg out", "Keep hips level", "Return slowly and switch"] }),
  ex({ id: "dead-bug", name: "Dead bug", bodyArea: "Lower back", purpose: "Core control with a protected spine", difficulty: 1,
    instructions: ["Lie on your back, arms and knees up", "Lower one arm and the opposite leg", "Keep lower back gently flat", "Alternate sides"] }),
  ex({ id: "side-plank", name: "Side plank", bodyArea: "Lower back", purpose: "Side trunk strength that supports the spine", difficulty: 2,
    instructions: ["Lie on your side, elbow under shoulder", "Lift hips into a straight line", "Hold 10 to 30 seconds"],
    regression: "Keep knees bent on the floor." }),
  ex({ id: "front-plank", name: "Front plank", bodyArea: "Lower back", purpose: "Whole trunk endurance", difficulty: 2,
    instructions: ["Forearms under shoulders", "Lift to a straight line from head to heels", "Breathe and hold"],
    regression: "Plank from knees or hands." }),
  ex({ id: "pallof-press", name: "Pallof press", bodyArea: "Lower back", purpose: "Resist rotation to protect the spine in sport", difficulty: 2,
    equipment: ["Resistance band"],
    instructions: ["Anchor band at chest height to your side", "Press hands straight out", "Resist the twist", "Return slowly"] }),
  ex({ id: "glute-max-isometric", name: "Standing glute squeeze", bodyArea: "Lower back", purpose: "Simple glute activation to support the back", difficulty: 1,
    instructions: ["Stand tall", "Squeeze your glutes firmly for 5 to 10 seconds", "Relax and repeat"] }),

  // ---- Shoulder / Neck ----
  ex({ id: "band-external-rotation", name: "Band external rotation", bodyArea: "Shoulder", purpose: "Strengthen rotator cuff", difficulty: 2,
    equipment: ["Resistance band"],
    instructions: ["Elbow at your side bent to 90 degrees", "Rotate forearm outward against band", "Return slowly"],
    commonMistakes: ["Letting the elbow drift away", "Shrugging the shoulder"] }),
  ex({ id: "scapular-wall-slide", name: "Scapular wall slide", bodyArea: "Shoulder", purpose: "Retrain shoulder blade movement", difficulty: 1,
    equipment: ["Wall"],
    instructions: ["Forearms on a wall", "Slide arms up keeping contact", "Lower slowly"] }),
  ex({ id: "shoulder-isometric-er", name: "Shoulder isometric rotation", bodyArea: "Shoulder", purpose: "Early painless cuff loading", difficulty: 1,
    equipment: ["Wall or doorframe"],
    instructions: ["Elbow at side bent to 90 degrees", "Press the back of your wrist into a doorframe", "Hold 5 to 10 seconds without movement"] }),
  ex({ id: "band-row", name: "Band row", bodyArea: "Shoulder", purpose: "Strengthen mid-back to support the shoulder", difficulty: 2,
    equipment: ["Resistance band"],
    instructions: ["Anchor band in front", "Pull elbows back, squeezing shoulder blades", "Return slowly"] }),
  ex({ id: "prone-y-raise", name: "Prone Y raise", bodyArea: "Shoulder", purpose: "Lower trapezius strength for overhead athletes", difficulty: 2,
    instructions: ["Lie face down, arms overhead in a Y", "Lift arms a few centimetres", "Lower slowly"],
    sports: ["Cricket", "Tennis", "Gym training", "Martial arts", "Basketball", "Rugby", "AFL"] }),
  ex({ id: "push-up-plus", name: "Push up plus", bodyArea: "Shoulder", purpose: "Strengthen the muscle that anchors the shoulder blade", difficulty: 2,
    instructions: ["Push up position (knees fine)", "At the top, push the floor away to round the upper back", "Return and repeat"] }),
  ex({ id: "chin-tucks", name: "Chin tucks", bodyArea: "Neck", purpose: "Gentle deep neck activation and posture reset", difficulty: 1,
    instructions: ["Sit tall", "Glide your chin straight back, making a double chin", "Hold 5 seconds, relax"] }),
  ex({ id: "neck-isometrics", name: "Neck isometrics", bodyArea: "Neck", purpose: "Build neck strength without movement", difficulty: 1,
    instructions: ["Place palm on your forehead", "Press head into palm gently without moving", "Hold 5 to 10 seconds", "Repeat on each side"] }),

  // ---- Elbow / Wrist ----
  ex({ id: "wrist-extension-isometric", name: "Wrist extension isometric", bodyArea: "Elbow", purpose: "Calm tennis-elbow style pain with stillness loading", difficulty: 1,
    instructions: ["Forearm supported, palm down", "Press the back of your hand up into your other hand", "Hold 10 to 30 seconds, no movement"] }),
  ex({ id: "eccentric-wrist-extension", name: "Eccentric wrist extension", bodyArea: "Elbow", purpose: "Progressive loading for the forearm extensors", difficulty: 2,
    equipment: ["Light weight or filled bottle"],
    instructions: ["Forearm supported, palm down, holding light weight", "Lift wrist with help from your other hand", "Lower slowly over 3 to 5 seconds"] }),
  ex({ id: "wrist-flexion-isometric", name: "Wrist flexion isometric", bodyArea: "Wrist", purpose: "Early painless wrist loading", difficulty: 1,
    instructions: ["Forearm supported, palm up", "Press your palm up into your other hand without movement", "Hold 10 to 20 seconds"] }),
  ex({ id: "wrist-curls-light", name: "Light wrist curls", bodyArea: "Wrist", purpose: "Rebuild wrist strength gradually", difficulty: 2,
    equipment: ["Light weight or filled bottle"],
    instructions: ["Forearm supported, palm up with light weight", "Curl wrist up", "Lower slowly"] }),
  ex({ id: "forearm-rotations", name: "Forearm rotations", bodyArea: "Wrist", purpose: "Restore palm-up palm-down movement", difficulty: 1,
    equipment: ["Light stick or hammer optional"],
    instructions: ["Elbow at your side bent to 90 degrees", "Slowly turn palm up, then palm down", "Add a light stick for resistance later"] }),
  ex({ id: "grip-squeeze", name: "Grip squeeze", bodyArea: "Wrist", purpose: "Rebuild grip without wrist strain", difficulty: 1,
    equipment: ["Soft ball or rolled sock"],
    instructions: ["Hold a soft ball", "Squeeze gently 5 seconds", "Relax fully between reps"] }),
];

export function exercisesByArea(area: BodyArea): Exercise[] {
  return EXERCISES.filter((e) => e.bodyArea === area);
}

export function getExercise(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
