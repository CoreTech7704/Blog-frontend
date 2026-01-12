export default function BlogCardSkeleton({ featured = false }) {
  return (
    <div
      className={`
        rounded-2xl border border-white/10
        bg-black/40 backdrop-blur-sm
        animate-pulse
        ${featured ? "min-h-[260px]" : "min-h-[180px]"}
      `}
    >
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="h-5 w-20 rounded-full bg-white/10" />

        {/* Title */}
        <div className={`h-6 bg-white/10 rounded ${featured ? "w-3/4" : "w-2/3"}`} />

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-5/6" />
          <div className="h-3 bg-white/10 rounded w-2/3" />
        </div>

        {/* Footer */}
        <div className="h-3 w-16 bg-white/10 rounded mt-4" />
      </div>
    </div>
  );
}
