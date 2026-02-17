import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  });

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

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
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setCoverPreview(null);
    setCoverFile(null);
  }

  async function handleSubmit(status) {
    if (isSubmitting) return;

    if (!form.title || !form.content || !form.category) {
      alert("Title, content, and category are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("excerpt", form.excerpt);
      fd.append("content", form.content);
      fd.append("category", form.category);
      fd.append("status", status);

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

      navigate("/dashboard");
    } catch {
      alert("Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <form onSubmit={(e) => e.preventDefault()} className="card">
        <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>

        {/* Title */}
        <Field
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter blog title"
        />

        {/* Description */}
        <Field
          label="Short Description"
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          placeholder="Brief summary of your blog"
          textarea
          rows={3}
        />

        {/* Cover Image */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Cover Image
          </label>

          <div className="relative h-48 sm:h-56 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-sm">
                No cover image
              </span>
            )}

            <div className="absolute bottom-3 right-3 flex gap-2">
              <label className="btn btn-outline cursor-pointer">
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
                  className="btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
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
        <Field
          label="Content"
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write your blog content here..."
          textarea
          rows={10}
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="btn bg-primary text-primary-foreground disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="btn btn-outline disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-sm text-muted-foreground hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

/* ---------- Reusable Field ---------- */

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  textarea,
  rows,
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input resize-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input"
        />
      )}
    </div>
  );
}
