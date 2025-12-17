export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">IlVantaggioAI.it</h1>
        <p className="mt-3 text-zinc-600">
          Stack moderno (Next.js + Postgres) per autoblogging AI, con quality gates e SEO Bot.
        </p>
        <a
          className="mt-8 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-white"
          href="/admin/login"
        >
          Vai all’admin
        </a>
      </main>
    </div>
  );
}
