import RedFlagGate from "@/components/RedFlagGate";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";

export default function SafetyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Safety check</h1>
        <p className="mt-1 text-sm text-slate-600">
          We screen for warning signs that need professional care before any self-guided rehab.
        </p>
      </div>
      <RedFlagGate />
      <SafetyDisclaimer compact />
    </div>
  );
}
