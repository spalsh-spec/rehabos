"use client";

import { useState } from "react";

export default function MentalRecoveryCard({
  title,
  body,
  expandable = true,
}: {
  title: string;
  body: string;
  expandable?: boolean;
}) {
  const [open, setOpen] = useState(!expandable);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      {expandable ? (
        <button type="button" onClick={() => setOpen((o) => !o)} className="w-full text-left" aria-expanded={open}>
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </button>
      ) : (
        <h3 className="font-semibold text-slate-900">{title}</h3>
      )}
      {open && <p className="mt-2 text-sm leading-relaxed text-slate-700">{body}</p>}
    </div>
  );
}
