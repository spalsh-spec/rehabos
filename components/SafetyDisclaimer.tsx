export default function SafetyDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-slate-500 leading-relaxed">
        RehabOS is educational only. It does not diagnose or replace medical care.
      </p>
    );
  }
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
      <p className="font-semibold mb-1">Important</p>
      <p>
        RehabOS is educational only. It does not diagnose or replace medical care. Seek
        urgent care for severe pain, deformity, numbness, weakness, chest pain, breathing
        difficulty, head injury symptoms, infection signs, or rapidly worsening symptoms.
      </p>
    </div>
  );
}
