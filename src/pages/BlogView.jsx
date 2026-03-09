import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "@/api/axios";
import MarkdownContent from "@/components/MarkDownContent";
import BlogViewSkeleton from "@/components/BlogViewSkeleton";
import { useAuth } from "@/hooks/useAuth";

export default function BlogView() {
  const { slug } = useParams();
  const { user: currentUser } = useAuth();

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
      .then((res) => {
        setComments(res.data.comments || []);
      })
      .catch(() => {
        setComments([]);
      });
  }, [blog]);

  if (loading) return <BlogViewSkeleton />;

  if (error || !blog) {
    return (
      <main className="min-h-screen flex items-center justify-center text-foreground">
        Blog not found
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen transition-colors duration-300">
      {/* ================= HEADER ================= */}
      <section className="pt-40 px-6 bg-[#05070d]">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {(blog.tags?.length ? blog.tags : ["General"]).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold">{blog.title}</h1>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
            {/* Author */}
            {blog.author && (
              <Link
                to={`/user/${blog.author.username}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={blog.author?.avatar?.url || "/default-avatar.png"}
                    alt="author"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium">{blog.author.fullname}</span>
                    <span className="text-xs text-slate-500">
                      @{blog.author.username}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <span>•</span>

            {/* Date */}
            <span>{new Date(blog.createdAt).toDateString()}</span>

            <span>•</span>

            {/* Reading time */}
            <span>{blog.readTime || 5} min read</span>
          </div>
        </div>

        <section className="px-6 pb-10 flex justify-center bg-[#05070d]">
          {blog.cover?.url && (
            <img
              loading="lazy"
              src={blog.cover.url}
              alt="cover"
              className="w-full lg:w-[60%] h-auto object-cover rounded-xl mt-5"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
        </section>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="px-6 py-24">
        <article className="mx-auto max-w-4xl space-y-6 text-muted-foreground">
          <MarkdownContent content={blog.content} />
        </article>
      </section>

      {/* ================= COMMENTS ================= */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
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
              className="
                mt-3 px-4 py-2 rounded-md font-medium
                bg-sky-400 text-black
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {commentLoading ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {/* Comments List */}
          {comments.length === 0 ? (
            <p className="text-muted-foreground">No comments yet.</p>
          ) : (
            <div className="space-y-6">
              {comments.map((c) => (
                <div key={c._id} className="flex gap-4">
                  <Link to={`/user/${c.user?.username || "#"}`}>
                    <img
                      src={c.user?.avatar?.url || "/default-avatar.png"}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/default-avatar.png";
                      }}
                    />
                  </Link>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {c.user ? (
                        <Link
                          to={`/user/${c.user.username}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {c.user.fullname}
                        </Link>
                      ) : (
                        <span className="font-medium text-muted-foreground">
                          Deleted User
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p className="text-foreground/80 mt-1">{c.content}</p>

                    {/* Delete (owner/admin later) */}
                    {(c.user?._id?.toString() === currentUser?._id ||
                      blog.author?._id?.toString() === currentUser?._id) && (
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
                    )}
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
