import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogCard({
  slug,
  title,
  excerpt,
  category,
  readTime,
  featured = false,
}) {
  return (
    <Link
      to={`/blogs/${slug}`}
      className={`
        group relative block overflow-hidden rounded-2xl
        border backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-1

        ${
          featured
            ? "bg-slate-950 border-white/10 shadow-xl hover:border-white/20"
            : "bg-white/70 dark:bg-black/40 border-slate-200 dark:border-white/10 shadow-md dark:shadow-lg hover:border-slate-300 dark:hover:border-white/20"
        }
      `}
    >
      <div className={`p-6 ${featured ? "min-h-[260px]" : "min-h-[180px]"}`}>
        {/* Category */}
        <span
          className={`
            inline-block mb-3 rounded-full border px-3 py-1 text-xs
            ${
              featured
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
                : "text-lg text-slate-900 dark:text-slate-100"
            }
          `}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p
          className={`
            mt-3 text-sm line-clamp-3
            ${
              featured
                ? "text-slate-400"
                : "text-slate-600 dark:text-slate-400"
            }
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
