import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogCard({
  slug,
  title,
  excerpt,
  category,
  readTime,
  cover,
  featured = false,
  compact = false,
}) {
  return (
    <Link
      to={`/blogs/${slug}`}
      className={`
        group relative block overflow-hidden rounded-2xl
        border backdrop-blur-sm transition-all duration-300
        hover:-translate-y-1

        ${
          featured
            ? "bg-slate-950 border-white/10 shadow-xl hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"
            : compact
            ? "bg-slate-950/70 border-white/10 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"
            : "bg-white/70 dark:bg-black/40 border-slate-200 dark:border-white/10"
        }
      `}
    >

      {featured && cover && !compact && (
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="
              h-full w-full object-cover rounded-t-2xl
              transition-transform duration-500
              group-hover:scale-105
            "
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      <div className={`p-6 ${featured ? "pt-5 min-h-72" : "min-h-48"}`}>
        {/* Category */}
        <span
          className={`
            inline-block mb-3 rounded-full border px-3 py-1 text-xs
            ${
              featured
                ? "border-white/20 text-slate-300"
                : compact
                ? "border-white/20 text-slate-300"
                : "border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300"
            }
          `}
        >
          {category}
        </span>

        {/* Title */}
        <h3
          className={`
            font-semibold leading-snug
            ${
              featured
                ? "text-2xl text-white"
                : compact
                ? "text-lg text-slate-100"
                : "text-lg text-slate-900 dark:text-slate-100"
            }
          `}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p
          className={`
            mt-3 text-sm
            ${compact ? "line-clamp-2" : "line-clamp-3"}
            ${featured ? "text-slate-400" : "text-slate-500"}
          `}
        >
          {excerpt}
        </p>

        {/* Footer */}
        <div
          className={`
            mt-6 flex items-center justify-between text-xs
            ${featured ? "text-slate-500" : "text-slate-500"}
          `}
        >
          <span>{readTime || 5} min read</span>

          <ArrowUpRight
            className={`
              h-4 w-4 transition
              opacity-0
              group-hover:opacity-100
              group-hover:translate-x-1
              group-hover:-translate-y-1
              ${featured ? "text-slate-300" : "text-slate-700 dark:text-slate-300"}
            `}
          />
        </div>
      </div>
    </Link>
  );
}
