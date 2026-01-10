import { useParams } from "react-router-dom";
import blogs from "@/data/blogs.json";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MarkdownContent from "@/components/MarkdownContent";

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

          <h1 className="text-4xl sm:text-5xl font-bold">{blog.title}</h1>

          <p className="mt-6 text-sm text-slate-500">
            {new Date(blog.createdAt?.$date).toDateString()} •{" "}
            {Math.ceil(blog.content.length / 800)} min read
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <article className="mx-auto max-w-3xl space-y-6 text-slate-300">
          <MarkdownContent content={blog.content} />
        </article>
      </section>

      {/* Comments Section */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <h3 className="text-xl font-semibold text-white mb-6">
            Comments <span className="text-slate-500">(2)</span>
          </h3>

          {/* Add Comment */}
          <div className="mb-8">
            {/* assume logged-in for now */}
            <textarea
              rows={3}
              placeholder="Write a comment..."
              className="
          w-full rounded-lg
          bg-[#0b0f1a]
          border border-white/10
          text-slate-200
          p-4
          placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-sky-400
        "
            />

            <button
              className="
          mt-3 px-5 py-2 rounded-md
          bg-sky-400 text-slate-950
          font-medium
          hover:bg-sky-300
          transition-colors
        "
            >
              Post Comment
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {/* Comment */}
            <div
              className="
          rounded-xl
          bg-[#0b0f1a]
          border border-white/10
          p-5
        "
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-white">Harsh Panchal</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>

                {/* owner / admin */}
                <button className="text-xs text-red-400 hover:underline">
                  Delete
                </button>
              </div>

              <p className="mt-3 text-slate-300 leading-relaxed">
                Great article! The Tailwind v4 dark mode explanation was very
                clear.
              </p>
            </div>

            {/* Comment */}
            <div
              className="
          rounded-xl
          bg-[#0b0f1a]
          border border-white/10
          p-5
        "
            >
              <div>
                <p className="font-medium text-white">Amit Patel</p>
                <p className="text-xs text-slate-500 mt-1">1 day ago</p>
              </div>

              <p className="mt-3 text-slate-300 leading-relaxed">
                This helped me fix my project. Thanks for sharing!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
