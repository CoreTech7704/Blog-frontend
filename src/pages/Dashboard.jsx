import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/blogs/me")
      .then((res) => setBlogs(res.data))
      .finally(() => setLoading(false));
  }, []);

  const published = blogs.filter((b) => b.status === "published").length;
  const drafts = blogs.filter((b) => b.status === "draft").length;

  // ✅ DELETE HANDLER (CORRECT PLACE)
  async function handleDelete(id) {
    if (!confirm("Delete this blog?")) return;

    try {
      await api.delete(`/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Failed to delete blog");
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 my-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>

        <Link
          to="/dashboard/blogs/new"
          className="px-4 py-2 rounded-md bg-sky-400 text-slate-950 font-medium hover:bg-sky-300 transition"
        >
          + Create Blog
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <StatCard label="Total Blogs" value={blogs.length} />
        <StatCard label="Published" value={published} />
        <StatCard label="Drafts" value={drafts} />
      </div>

      {/* Blogs List */}
      <div className="mt-6 space-y-4">
        {loading && <p className="text-slate-500">Loading blogs...</p>}

        {!loading &&
          blogs.map((blog) => (
            <BlogRow
              key={blog._id}
              blog={blog}
              onDelete={handleDelete}
            />
          ))}

        {!loading && blogs.length === 0 && (
          <p className="text-slate-600 dark:text-slate-400">
            You haven’t written any blogs yet.
          </p>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-center">
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
}

function BlogRow({ blog, onDelete }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {blog.title}
        </h3>

        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {blog.category?.name} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        <span
          className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium
          ${
            blog.status === "published"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
          }`}
        >
          {blog.status}
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/dashboard/blogs/${blog._id}/edit`}
          className="px-3 py-1.5 rounded-md text-sm border border-slate-300 dark:border-slate-700"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(blog._id)}
          className="px-3 py-1.5 rounded-md text-sm border border-red-300 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
