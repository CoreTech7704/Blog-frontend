import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const [coverPreview, setCoverPreview] = useState(
    "https://via.placeholder.com/1200x500?text=Cover+Image",
  );

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  function removeCover() {
    setCoverPreview(null);
    setCoverFile(null);
  }

  async function handleSubmit(status) {
    if (!form.title || !form.content || !form.category) {
      alert("Title, content, and category are required");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("excerpt", form.excerpt);
      fd.append("content", form.content);
      fd.append("category", form.category);
      fd.append("status", status);

      // ✅ Validate only if cover exists
      if (coverFile) {
        if (!coverFile.type.startsWith("image/")) {
          alert("Only images allowed");
          return;
        }

        if (coverFile.size > 5 * 1024 * 1024) {
          alert("Max 5MB allowed");
          return;
        }

        fd.append("cover", coverFile);
      }

      await api.post("/api/blogs", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        status === "published"
          ? "Blog published successfully"
          : "Draft saved successfully",
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
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
          name="excerpt"
          value={form.excerpt}
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

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
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
