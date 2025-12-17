"use client";

import { useState } from "react";

type SeoIssue = {
  code: string;
  message: string;
  severity: "warn" | "error";
};

type SeoAuditResult = {
  score: number;
  issues: SeoIssue[];
};

export default function SeoBotPage() {
  const [title, setTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [keywordPrimary, setKeywordPrimary] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [result, setResult] = useState<SeoAuditResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function runAudit() {
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/seo/audit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, metaDesc, keywordPrimary, contentHtml }),
    });
    setLoading(false);
    if (!res.ok) {
      setResult({ score: 0, issues: [{ code: "ERROR", message: "Input non valido.", severity: "error" }] });
      return;
    }
    setResult((await res.json()) as SeoAuditResult);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">SEO Bot (Audit)</h1>
          <button
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="text-sm font-medium">Titolo</label>
          <input className="rounded-lg border border-zinc-300 px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label className="text-sm font-medium">Meta description</label>
          <input
            className="rounded-lg border border-zinc-300 px-3 py-2"
            value={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
          />

          <label className="text-sm font-medium">Keyword primaria</label>
          <input
            className="rounded-lg border border-zinc-300 px-3 py-2"
            value={keywordPrimary}
            onChange={(e) => setKeywordPrimary(e.target.value)}
          />

          <label className="text-sm font-medium">Content HTML</label>
          <textarea
            className="min-h-56 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm"
            value={contentHtml}
            onChange={(e) => setContentHtml(e.target.value)}
          />

          <button
            className="mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
            onClick={runAudit}
            disabled={loading}
          >
            {loading ? "Analisi..." : "Esegui audit"}
          </button>
        </div>

        {result ? (
          <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Risultato</h2>
              <div className="text-sm text-zinc-600">Score: {result.score}/100</div>
            </div>
            <ul className="mt-4 space-y-2">
              {result.issues.length === 0 ? (
                <li className="text-sm text-emerald-700">Nessun issue: pronto per publish.</li>
              ) : (
                result.issues.map((it, idx) => (
                  <li key={idx} className="text-sm">
                    <span className={it.severity === "error" ? "text-red-700" : "text-amber-700"}>
                      [{it.severity.toUpperCase()}] {it.code}
                    </span>{" "}
                    — {it.message}
                  </li>
                ))
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}


