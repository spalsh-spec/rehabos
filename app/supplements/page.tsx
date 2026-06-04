import SupplementArticleCard from "@/components/SupplementArticleCard";
import { EVIDENCE_ORDER, SUPPLEMENT_ARTICLES, SUPPLEMENT_SAFETY_NOTICE } from "@/lib/supplementRiskRules";

export default function SupplementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Supplement education</h1>
        <p className="mt-1 text-sm text-slate-600">
          Evidence-ranked education only. No supplement heals injuries, and nothing here is a
          recommendation or dosage advice.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {SUPPLEMENT_SAFETY_NOTICE}
      </div>

      {EVIDENCE_ORDER.map((cat) => {
        const items = SUPPLEMENT_ARTICLES.filter((a) => a.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{cat}</h2>
            {items.map((a) => (
              <SupplementArticleCard key={a.id} article={a} />
            ))}
          </section>
        );
      })}
    </div>
  );
}
