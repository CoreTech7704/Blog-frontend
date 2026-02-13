export default function BlogCardSkeleton({ featured = false }) {
  return (
    <div
      className={`
        relative rounded-2xl border
        backdrop-blur-sm animate-pulse
        transition-colors duration-300

        ${
          featured
            ? "bg-slate-950 border-white/10"
            : "bg-slate-100 dark:bg-black/40 border-slate-200 dark:border-white/10"
        }

        ${featured ? "min-h-[260px]" : "min-h-[180px]"}
      `}
    >
      <div className="p-6 space-y-4">
        {/* Category pill */}
        <div
          className={`
            h-5 w-20 rounded-full
            ${featured ? "bg-white/10" : "bg-slate-300/50 dark:bg-white/10"}
          `}
        />

        {/* Title */}
        <div
          className={`
            h-6 rounded
            ${featured ? "bg-white/15" : "bg-slate-300/50 dark:bg-white/10"}
            ${featured ? "w-3/4" : "w-2/3"}
          `}
        />

        {/* Excerpt */}
        <div className="space-y-2">
          <div
            className={`h-3 rounded w-full ${
              featured ? "bg-white/10" : "bg-slate-300/50 dark:bg-white/10"
            }`}
          />
          <div
            className={`h-3 rounded w-5/6 ${
              featured ? "bg-white/10" : "bg-slate-300/50 dark:bg-white/10"
            }`}
          />
          <div
            className={`h-3 rounded w-2/3 ${
              featured ? "bg-white/10" : "bg-slate-300/50 dark:bg-white/10"
            }`}
          />
        </div>

        {/* Footer */}
        <div
          className={`h-3 w-16 rounded mt-4 ${
            featured ? "bg-white/10" : "bg-slate-300/50 dark:bg-white/10"
          }`}
        />
      </div>
    </div>
  );
}