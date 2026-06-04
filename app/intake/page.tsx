import InjuryIntakeForm from "@/components/InjuryIntakeForm";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";

export default function IntakePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tell us about your injury</h1>
        <p className="mt-1 text-sm text-slate-600">
          This helps match you to a general guidance pathway. It is not a diagnosis.
        </p>
      </div>
      <InjuryIntakeForm />
      <SafetyDisclaimer compact />
    </div>
  );
}
