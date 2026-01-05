import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogCard({
  title,
  excerpt,
  category,
  readTime,
  featured = false,
}) {
  return (
    <Link
      to="/blogs/sample-slug"
      className={`
        group relative block overflow-hidden rounded-2xl
        border border-white/10
        bg-black/40
        backdrop-blur-sm
        transition-all duration-300
        hover:border-white/20 hover:-translate-y-1
      `}
    >
      <div className={`p-6 ${featured ? "min-h-[260px]" : "min-h-[180px]"}`}>
        
        {/* Category */}
        <span className="inline-block mb-3 rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300">
          {category}
        </span>

        {/* Title */}
        <h3
          className={`font-semibold leading-snug text-slate-100 
            ${featured ? "text-2xl" : "text-lg"}
          `}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-sm text-slate-400 line-clamp-3">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <span>{readTime} min read</span>
          <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
}
