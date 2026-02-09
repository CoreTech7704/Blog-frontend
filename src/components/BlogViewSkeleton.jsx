export default function BlogViewSkeleton() {
  return (
    <main className="min-h-screen animate-pulse
                     bg-white text-slate-900
                     dark:bg-black dark:text-white">
      
      <section className="pt-40 pb-24 px-6
                          bg-slate-100 dark:bg-[#05070d]">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="h-4 w-24 rounded
                          bg-slate-300 dark:bg-white/10" />
          <div className="h-10 w-3/4 rounded
                          bg-slate-300 dark:bg-white/10" />
          <div className="h-4 w-48 rounded
                          bg-slate-300 dark:bg-white/10" />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full rounded
                         bg-slate-300 dark:bg-white/10"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
