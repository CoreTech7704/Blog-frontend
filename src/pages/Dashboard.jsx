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
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <Link
          to="/dashboard/blogs/new"
          className="btn w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90"
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
        {loading && (
          <p className="text-muted-foreground">Loading blogs...</p>
        )}

        {!loading &&
          blogs.map((blog) => (
            <BlogRow
              key={blog._id}
              blog={blog}
              onDelete={handleDelete}
            />
          ))}

        {!loading && blogs.length === 0 && (
          <p className="text-muted-foreground">
            You haven’t written any blogs yet.
          </p>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="card-subtitle mt-1">{label}</div>
    </div>
  );
}

function BlogRow({ blog, onDelete }) {
  return (
    <div className="surface p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="font-semibold break-words">{blog.title}</h3>

        <div className="text-sm text-muted-foreground mt-1">
          {blog.category?.name} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        <StatusBadge status={blog.status} />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          to={`/dashboard/blogs/${blog._id}/edit`}
          className="btn btn-outline"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(blog._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    published:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    draft:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  };

  return (
    <span className={`badge ${status === "published" ? "badge-success" : "badge-warning"}`}>
      {status}
    </span>
  );
}
