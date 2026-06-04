import { getExercise } from "@/lib/exerciseLibrary";
import { RehabPhase } from "@/lib/types";

export default function RehabPhaseCard({
  phase,
  isCurrent,
}: {
  phase: RehabPhase;
  isCurrent: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 space-y-3 ${
        isCurrent ? "border-brand-600 bg-brand-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">
          Phase {phase.number}: {phase.name}
        </h3>
        {isCurrent && (
          <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            You are here
          </span>
        )}
      </div>
      <p className="text-sm text-slate-700">{phase.goal}</p>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-red-700 mb-1">Do not do</p>
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-0.5">
          {phase.doNotDo.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Exercises</p>
        <div className="space-y-2">
          {phase.exercises.map((p) => {
            const e = getExercise(p.exerciseId);
            if (!e) return null;
            return (
              <div key={p.exerciseId} className="rounded-xl bg-white border border-slate-100 p-3">
                <p className="text-sm font-semibold text-slate-900">{e.name}</p>
                <p className="text-xs text-slate-500">
                  {p.sets} sets · {p.reps} · {p.tempo} · rest {p.rest}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        <span className="font-semibold">Frequency:</span> {phase.frequency}
      </p>
      <p className="text-xs text-slate-500">
        <span className="font-semibold">Pain rule:</span> {phase.painRule}
      </p>

      <details className="text-sm">
        <summary className="cursor-pointer font-medium text-brand-700">
          Progress, regress, and when to seek help
        </summary>
        <div className="mt-2 space-y-2 text-slate-700">
          <div>
            <p className="text-xs font-semibold text-slate-500">Consider progressing if</p>
            <ul className="list-disc pl-5 text-sm space-y-0.5">
              {phase.progressionCriteria.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Step back if</p>
            <ul className="list-disc pl-5 text-sm space-y-0.5">
              {phase.regressionCriteria.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-600">{phase.whenToSeekHelp}</p>
        </div>
      </details>
    </div>
  );
}
