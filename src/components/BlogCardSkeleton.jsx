export default function BlogCardSkeleton({ featured = false }) {
  return (
    <div
      className={`
        rounded-2xl border
        bg-slate-100 dark:bg-black/40
        border-slate-200 dark:border-white/10
        backdrop-blur-sm animate-pulse
        ${featured ? "min-h-[260px]" : "min-h-[180px]"}
      `}
    >
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="h-5 w-20 rounded-full bg-slate-300/50 dark:bg-white/10" />

        {/* Title */}
        <div
          className={`
            h-6 rounded
            bg-slate-300/50 dark:bg-white/10
            ${featured ? "w-3/4" : "w-2/3"}
          `}
        />

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-3 rounded bg-slate-300/50 dark:bg-white/10 w-full" />
          <div className="h-3 rounded bg-slate-300/50 dark:bg-white/10 w-5/6" />
          <div className="h-3 rounded bg-slate-300/50 dark:bg-white/10 w-2/3" />
        </div>

        {/* Footer */}
        <div className="h-3 w-16 rounded bg-slate-300/50 dark:bg-white/10 mt-4" />
      </div>
    </div>
  );
}
