import DailyCheckInForm from "@/components/DailyCheckInForm";
import SafetyDisclaimer from "@/components/SafetyDisclaimer";

export default function CheckInPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daily check-in</h1>
        <p className="mt-1 text-sm text-slate-600">
          Takes under a minute. Your answers guide when to progress, pause, or seek help.
        </p>
      </div>
      <DailyCheckInForm />
      <SafetyDisclaimer compact />
    </div>
  );
}
