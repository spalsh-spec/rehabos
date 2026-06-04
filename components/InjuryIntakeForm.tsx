"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SportSelector from "./SportSelector";
import BodyAreaSelector from "./BodyAreaSelector";
import { store } from "@/lib/store";
import { BodyArea, Difficulty, IntakeData, Sport, SwellingLevel } from "@/lib/types";

const MECHANISMS = [
  "Twisted or rolled",
  "Sudden sharp pain while sprinting or kicking",
  "Direct impact or collision",
  "Fall",
  "Gradual onset over days or weeks",
  "Lifting or overload",
  "Not sure",
];

const EQUIPMENT_OPTIONS = ["None", "Resistance band", "Light weights", "Step or stairs", "Chair", "Towel", "Ball"];

function YesNo({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex gap-1">
        {[
          { v: true, t: "Yes" },
          { v: false, t: "No" },
        ].map((o) => (
          <button
            key={o.t}
            type="button"
            onClick={() => onChange(o.v)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              value === o.v ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
            }`}
            aria-pressed={value === o.v}
          >
            {o.t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InjuryIntakeForm() {
  const router = useRouter();
  const [sport, setSport] = useState<Sport | null>(null);
  const [bodyArea, setBodyArea] = useState<BodyArea | null>(null);
  const [mechanism, setMechanism] = useState(MECHANISMS[0]);
  const [painScore, setPainScore] = useState(3);
  const [swelling, setSwelling] = useState<SwellingLevel>("none");
  const [bruising, setBruising] = useState(false);
  const [canBearWeight, setCanBearWeight] = useState(true);
  const [canMoveJoint, setCanMoveJoint] = useState(true);
  const [numbnessTingling, setNumbnessTingling] = useState(false);
  const [weakness, setWeakness] = useState(false);
  const [instability, setInstability] = useState(false);
  const [dateOfInjury, setDateOfInjury] = useState(() => new Date().toISOString().slice(0, 10));
  const [previousInjuries, setPreviousInjuries] = useState("");
  const [trainingGoal, setTrainingGoal] = useState("");
  const [equipment, setEquipment] = useState<string[]>(["None"]);
  const [timePerDay, setTimePerDay] = useState(15);
  const [preferredDifficulty, setPreferredDifficulty] = useState<Difficulty>("standard");
  const [error, setError] = useState("");

  function toggleEquipment(item: string) {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev.filter((e) => e !== "None" || item === "None"), item]
    );
  }

  function submit() {
    if (!sport || !bodyArea) {
      setError("Please select your sport and the injured area.");
      return;
    }
    const intake: IntakeData = {
      sport,
      bodyArea,
      mechanism,
      painScore,
      swelling,
      bruising,
      canBearWeight,
      canMoveJoint,
      numbnessTingling,
      weakness,
      instability,
      // Safety-screen specific flags are confirmed on the next screen:
      visibleDeformity: false,
      suspectedFracture: false,
      headInjurySymptoms: false,
      chestPain: false,
      breathingDifficulty: false,
      feverOrInfectionSigns: false,
      worseningSymptoms: false,
      calfSwellingOrShortBreath: false,
      dateOfInjury,
      previousInjuries,
      trainingGoal,
      equipment,
      timePerDay,
      preferredDifficulty,
    };
    store.saveIntake(intake);
    router.push("/safety");
  }

  return (
    <div className="space-y-6">
      <SportSelector value={sport} onChange={setSport} />
      <BodyAreaSelector sport={sport} value={bodyArea} onChange={setBodyArea} />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">How did it happen?</label>
        <select
          value={mechanism}
          onChange={(e) => setMechanism(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        >
          {MECHANISMS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Pain right now: <span className="font-bold text-brand-700">{painScore} / 10</span>
        </label>
        <input
          type="range"
          min={0}
          max={10}
          value={painScore}
          onChange={(e) => setPainScore(Number(e.target.value))}
          className="w-full accent-teal-600"
          aria-label="Pain score from 0 to 10"
        />
        <div className="flex justify-between text-xs text-slate-400">
          <span>No pain</span>
          <span>Worst imaginable</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Swelling</label>
        <div className="grid grid-cols-4 gap-2">
          {(["none", "mild", "moderate", "severe"] as SwellingLevel[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSwelling(s)}
              className={`rounded-xl border px-2 py-2 text-sm capitalize ${
                swelling === s ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 divide-y divide-slate-100">
        <YesNo label="Bruising?" value={bruising} onChange={setBruising} />
        <YesNo label="Can you put weight on it?" value={canBearWeight} onChange={setCanBearWeight} />
        <YesNo label="Can you move the joint?" value={canMoveJoint} onChange={setCanMoveJoint} />
        <YesNo label="Numbness or tingling?" value={numbnessTingling} onChange={setNumbnessTingling} />
        <YesNo label="Noticeable weakness?" value={weakness} onChange={setWeakness} />
        <YesNo label="Does it feel unstable or giving way?" value={instability} onChange={setInstability} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">When did the injury happen?</label>
        <input
          type="date"
          value={dateOfInjury}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setDateOfInjury(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Previous injuries to this area (optional)</label>
        <textarea
          value={previousInjuries}
          onChange={(e) => setPreviousInjuries(e.target.value)}
          rows={2}
          placeholder="e.g. sprained the same ankle last year"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Training goal (optional)</label>
        <input
          value={trainingGoal}
          onChange={(e) => setTrainingGoal(e.target.value)}
          placeholder="e.g. return to club soccer"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Available equipment</label>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT_OPTIONS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => toggleEquipment(e)}
              className={`rounded-full border px-3 py-2 text-sm ${
                equipment.includes(e) ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Time available per day: <span className="font-bold text-brand-700">{timePerDay} min</span>
        </label>
        <input
          type="range"
          min={5}
          max={60}
          step={5}
          value={timePerDay}
          onChange={(e) => setTimePerDay(Number(e.target.value))}
          className="w-full accent-teal-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Preferred difficulty</label>
        <div className="grid grid-cols-3 gap-2">
          {(["gentle", "standard", "challenging"] as Difficulty[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setPreferredDifficulty(d)}
              className={`rounded-xl border px-2 py-2 text-sm capitalize ${
                preferredDifficulty === d ? "border-brand-600 bg-brand-50 text-brand-700" : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={submit}
        className="w-full rounded-2xl bg-brand-600 px-4 py-4 text-base font-semibold text-white hover:bg-brand-700"
      >
        Continue to safety check
      </button>
    </div>
  );
}
