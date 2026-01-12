import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "@/api/axios";
import MarkdownContent from "@/components/MarkdownContent";
import BlogViewSkeleton from "@/components/BlogViewSkeleton";

export default function BlogView() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(`/api/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <BlogViewSkeleton />;

  if (error || !blog) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Blog not found
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HEADER */}
      <section className="pt-40 pb-24 px-6 bg-[#05070d]">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <span className="inline-block mb-4 rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300">
            #{blog.tags?.[0] || "General"}
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold">{blog.title}</h1>

          <p className="mt-6 text-sm text-slate-500">
            {new Date(blog.createdAt).toDateString()} •{" "}
            {Math.max(3, Math.ceil(blog.content.length / 800))} min read
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 py-24">
        <article className="mx-auto max-w-3xl space-y-6 text-slate-300">
          <MarkdownContent content={blog.content} />
        </article>
      </section>

      {/* COMMENTS (STATIC FOR NOW) */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-xl font-semibold text-white mb-6">
            Comments <span className="text-slate-500">(coming soon)</span>
          </h3>
        </div>
      </section>
    </main>
  );
}
