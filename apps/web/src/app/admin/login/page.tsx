"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Credenziali non valide.");
      return;
    }
    router.replace("/admin/seo");
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <form
          onSubmit={onSubmit}
          className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <h1 className="text-xl font-semibold">Admin login</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Accedi per usare il SEO Bot e gestire i contenuti.
          </p>

          <label className="mt-6 block text-sm font-medium">Email</label>
          <input
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="mt-4 block text-sm font-medium">Password</label>
          <input
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error ? (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          ) : null}

          <button
            className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Accesso..." : "Entra"}
          </button>
        </form>
      </div>
    </main>
  );
}


