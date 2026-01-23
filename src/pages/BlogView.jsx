import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "@/api/axios";
import MarkdownContent from "@/components/MarkDownContent";
import BlogViewSkeleton from "@/components/BlogViewSkeleton";

export default function BlogView() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(false);

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    api
      .get(`/api/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    if (!blog?._id) return;

    api
      .get(`/api/blogs/${blog._id}/comments`)
      .then((res) => setComments(res.data));
  }, [blog]);

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
      {/* ================= HEADER ================= */}
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

        <section className="pt-32 pb-24 px-6 bg-[#05070d]">
          {blog.coverImage && (
            <img
              loading="lazy"
              src={
                blog.coverImage.startsWith("http")
                  ? blog.coverImage
                  : `${import.meta.env.VITE_API_URL}${blog.coverImage}`
              }
              alt="cover"
              className="w-full h-96 object-cover rounded-xl mb-10"
            />
          )}

          <div className="mx-auto max-w-3xl">...</div>
        </section>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-24">
        <article className="mx-auto max-w-3xl space-y-6 text-slate-300">
          <MarkdownContent content={blog.content} />
        </article>
      </section>

      {/* ================= COMMENTS ================= */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-xl font-semibold mb-6">
            Comments ({comments.length})
          </h3>

          {/* Add Comment */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!commentText.trim()) return;

              setCommentLoading(true);
              try {
                const res = await api.post(`/api/blogs/${blog._id}/comments`, {
                  content: commentText,
                });

                setComments((prev) => [...prev, res.data]);
                setCommentText("");
              } catch {
                alert("Login required to comment");
              } finally {
                setCommentLoading(false);
              }
            }}
            className="mb-10"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="
                w-full rounded-lg p-4
                bg-white/5 border border-white/10
                text-white placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-sky-400
              "
            />

            <button
              disabled={commentLoading}
              className="mt-3 px-4 py-2 bg-sky-400 text-black rounded-md font-medium"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-slate-500">No comments yet.</p>
          ) : (
            <div className="space-y-6">
              {comments.map((c) => (
                <div key={c._id} className="flex gap-4">
                  <img
                    src={c.user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{c.user.fullname}</p>
                      <span className="text-xs text-slate-500">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-slate-300 mt-1">{c.content}</p>

                    {/* Delete (owner/admin later) */}
                    <button
                      onClick={async () => {
                        await api.delete(`/api/comments/${c._id}`);
                        setComments((prev) =>
                          prev.filter((x) => x._id !== c._id),
                        );
                      }}
                      className="text-xs text-red-400 hover:text-red-300 mt-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
