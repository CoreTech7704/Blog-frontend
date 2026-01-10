import { Link } from "react-router-dom"

export default function Dashboard() {
  // mock user blogs
  const blogs = [
    {
      id: 1,
      title: "Understanding React Hooks",
      status: "Published",
      category: "React",
      date: "Aug 10, 2025",
    },
    {
      id: 2,
      title: "Dark Mode in Tailwind v4",
      status: "Draft",
      category: "CSS",
      date: "Aug 5, 2025",
    },
    {
      id: 3,
      title: "Node.js Authentication Basics",
      status: "Published",
      category: "Backend",
      date: "Jul 28, 2025",
    },
  ]

  return (
    <main className="max-w-6xl mx-auto px-4 my-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>

        <Link
          to="/dashboard/blogs/new"
          className="
            inline-flex items-center justify-center
            px-4 py-2 rounded-md
            bg-sky-400 text-slate-950
            font-medium hover:bg-sky-300
            transition-colors
          "
        >
          + Create Blog
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <StatCard label="Total Blogs" value={blogs.length} />
        <StatCard
          label="Published"
          value={blogs.filter(b => b.status === "Published").length}
        />
        <StatCard
          label="Drafts"
          value={blogs.filter(b => b.status === "Draft").length}
        />
      </div>

      {/* Blogs List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          My Blogs
        </h2>

        <div className="mt-4 space-y-4">
          {blogs.map(blog => (
            <BlogRow key={blog.id} blog={blog} />
          ))}

          {blogs.length === 0 && (
            <p className="text-slate-600 dark:text-slate-400">
              You haven’t written any blogs yet.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

function StatCard({ label, value }) {
  return (
    <div
      className="
        bg-slate-100 dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-xl p-5 text-center
      "
    >
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        {label}
      </div>
    </div>
  )
}

function BlogRow({ blog }) {
  return (
    <div
      className="
        bg-slate-100 dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        rounded-xl p-4
        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
      "
    >
      {/* Info */}
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          {blog.title}
        </h3>

        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {blog.category} • {blog.date}
        </div>

        <span
          className={`
            inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium
            ${
              blog.status === "Published"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
            }
          `}
        >
          {blog.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          to={`/dashboard/blogs/${blog.id}/edit`}
          className="
            px-3 py-1.5 rounded-md text-sm
            border border-slate-300 dark:border-slate-700
            text-slate-700 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-800
            transition-colors
          "
        >
          Edit
        </Link>

        <button
          className="
            px-3 py-1.5 rounded-md text-sm
            border border-red-300 dark:border-red-800
            text-red-600 dark:text-red-400
            hover:bg-red-100 dark:hover:bg-red-900/30
            transition-colors
          "
        >
          Delete
        </button>
      </div>
    </div>
  )
}
