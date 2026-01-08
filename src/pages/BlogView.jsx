import { useParams } from "react-router-dom";
import blogs from "@/data/blogs.json";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BlogView() {
  const { slug } = useParams();

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        Blog not found
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
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

          <h1 className="text-4xl sm:text-5xl font-bold">
            {blog.title}
          </h1>

          <p className="mt-6 text-sm text-slate-500">
            {new Date(blog.createdAt?.$date).toDateString()} •{" "}
            {Math.ceil(blog.content.length / 800)} min read
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <article className="mx-auto max-w-3xl space-y-6 text-slate-300">
          {blog.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
