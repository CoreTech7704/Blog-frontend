import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [coverPreview, setCoverPreview] = useState(
    "https://via.placeholder.com/1200x500?text=Cover+Image"
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    status: "draft",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCoverPreview(URL.createObjectURL(file));
  }

  function removeCover() {
    setCoverPreview(null);
  }

  function handleSubmit(status) {
    const blogData = { ...form, status };
    console.log("New blog:", blogData);

    // later: send to backend
    navigate("/dashboard");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="
          bg-slate-100 dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl p-8
        "
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Create New Blog
        </h1>

        {/* Title */}
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter blog title"
        />

        {/* Description */}
        <Textarea
          label="Short Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief summary of your blog"
          rows={3}
        />

        {/* Cover Image*/}
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

            {/* Overlay actions */}
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
            <option value="">Select category</option>
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
          value={form.content}
          onChange={handleChange}
          placeholder="Write your blog content here..."
          rows={10}
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            onClick={() => handleSubmit("published")}
            className="
              px-5 py-2 rounded-md
              bg-sky-400 text-slate-950
              font-medium hover:bg-sky-300
              transition-colors
            "
          >
            Publish Blog
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("draft")}
            className="
              px-5 py-2 rounded-md
              border border-slate-300 dark:border-slate-700
              text-slate-700 dark:text-slate-300
              hover:bg-slate-200 dark:hover:bg-slate-800
              transition-colors
            "
          >
            Save as Draft
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              px-5 py-2 rounded-md
              text-slate-500 dark:text-slate-400
              hover:underline
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

/* ---------- Reusable Inputs ---------- */

function Input({ label, name, value, onChange, placeholder }) {
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
        placeholder={placeholder}
        className="
          mt-1 w-full rounded-md
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100
          p-2 focus:outline-none focus:ring-2 focus:ring-sky-400
        "
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder, rows }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          mt-1 w-full rounded-md
          bg-white dark:bg-slate-800
          border border-slate-300 dark:border-slate-700
          text-slate-900 dark:text-slate-100
          p-3 focus:outline-none focus:ring-2 focus:ring-sky-400
        "
      />
    </div>
  );
}
