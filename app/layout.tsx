import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "RehabOS — Recover smarter",
  description:
    "Sport specific rehab guidance, exercise tutorials, safety checks, progress tracking, and mental recovery support. Educational only — not medical care.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/plan", label: "Plan" },
  { href: "/exercises", label: "Exercises" },
  { href: "/checkin", label: "Check-in" },
  { href: "/progress", label: "Progress" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-brand-700">
              RehabOS
            </Link>
            <Link href="/settings" className="text-sm text-slate-500 hover:text-slate-700">
              Settings
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-xl px-4 pb-28 pt-6">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-xl justify-between px-2 py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex-1 rounded-xl px-1 py-2 text-center text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-brand-700"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </body>
    </html>
  );
}
