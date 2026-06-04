"use client";

import { useState } from "react";
import { SupplementArticle } from "@/lib/types";

const CATEGORY_STYLE: Record<string, string> = {
  "Higher evidence for general sport recovery": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Limited evidence": "bg-sky-50 text-sky-700 border-sky-200",
  "Insufficient evidence": "bg-slate-50 text-slate-600 border-slate-200",
  "Potentially risky": "bg-red-50 text-red-700 border-red-200",
  "Need professional advice": "bg-amber-50 text-amber-800 border-amber-200",
};

export default function SupplementArticleCard({ article }: { article: SupplementArticle }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full text-left" aria-expanded={open}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900">{article.title}</h3>
          <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium ${CATEGORY_STYLE[article.category]}`}>
            {article.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{article.summary}</p>
      </button>
      {open && (
        <div className="mt-3 space-y-3 border-t border-slate-100 pt-3 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Key points</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              {article.keyPoints.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700 mb-1">Cautions</p>
            <ul className="list-disc pl-5 text-slate-700 space-y-1">
              {article.cautions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-500">
            <span className="font-semibold">Regulatory status:</span> {article.regulatoryStatus}
          </p>
        </div>
      )}
    </div>
  );
}
