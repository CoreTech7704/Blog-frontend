export default function BlogViewSkeleton() {
  return (
    <main className="bg-black text-white min-h-screen animate-pulse">
      <section className="pt-40 pb-24 px-6 bg-[#05070d]">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="h-4 w-24 bg-white/10 rounded" />
          <div className="h-10 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-48 bg-white/10 rounded" />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-white/10 rounded w-full" />
          ))}
        </div>
      </section>
    </main>
  );
}
