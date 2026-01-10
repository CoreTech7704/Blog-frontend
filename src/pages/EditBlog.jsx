import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function EditBlog() {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock existing blog data (later from backend)
  const [form, setForm] = useState({
    title: "Dark Mode in Tailwind v4",
    description: "Learn how Tailwind v4 handles dark mode and how to fix it.",
    content:
      "Tailwind CSS v4 introduced a breaking change in dark mode handling...",
    category: "CSS",
    status: "published",
  })

  const [coverPreview, setCoverPreview] = useState(
    "https://via.placeholder.com/1200x500?text=Cover+Image"
  )

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleCoverChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setCoverPreview(URL.createObjectURL(file))
  }

  function removeCover() {
    setCoverPreview(null)
  }

  function handleUpdate() {
    console.log("Updated blog:", { id, ...form, coverPreview })
    // later: send to backend
    navigate("/dashboard")
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <form
        onSubmit={e => e.preventDefault()}
        className="
          bg-slate-100 dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl p-8
        "
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          Edit Blog
        </h1>

        {/* Cover Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Cover Image
          </label>

          <div
            className="
              relative w-full h-56
              rounded-xl overflow-hidden
              bg-slate-200 dark:bg-slate-800
              border border-slate-300 dark:border-slate-700
              flex items-center justify-center
            "
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                No cover image
              </span>
            )}

            <div className="absolute bottom-3 right-3 flex gap-2">
              <label
                className="
                  cursor-pointer px-3 py-1.5 rounded-md text-sm
                  bg-slate-900/70 text-white
                  hover:bg-slate-900 transition
                "
              >
                Change
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                />
              </label>

              {coverPreview && (
                <button
                  type="button"
                  onClick={removeCover}
                  className="
                    px-3 py-1.5 rounded-md text-sm
                    bg-red-600/80 text-white
                    hover:bg-red-600 transition
                  "
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        {/* Description */}
        <Textarea
          label="Short Description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
        />

        {/* Category */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="
              mt-1 w-full rounded-md
              bg-white dark:bg-slate-800
              border border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              p-2 focus:outline-none focus:ring-2 focus:ring-sky-400
            "
          >
            <option value="React">React</option>
            <option value="Backend">Backend</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>

        {/* Content */}
        <Textarea
          label="Content"
          name="content"
          rows={10}
          value={form.content}
          onChange={handleChange}
        />

        {/* Status */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="
              mt-1 w-full rounded-md
              bg-white dark:bg-slate-800
              border border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              p-2
            "
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            onClick={handleUpdate}
            className="
              px-5 py-2 rounded-md
              bg-sky-400 text-slate-950
              font-medium hover:bg-sky-300
              transition-colors
            "
          >
            Update Blog
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              px-5 py-2 rounded-md
              border border-slate-300 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-800
              transition-colors
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}

/* ---------- Inputs ---------- */

function Input({ label, name, value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="
          mt-1 w-full rounded-md
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100
          p-2 focus:outline-none focus:ring-2 focus:ring-sky-400
        "
      />
    </div>
  )
}

function Textarea({ label, name, rows, value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        className="
          mt-1 w-full rounded-md
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100
          p-3 focus:outline-none focus:ring-2 focus:ring-sky-400
        "
      />
    </div>
  )
}
