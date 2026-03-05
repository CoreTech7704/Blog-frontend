import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/axios";

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [coverPreview, setCoverPreview] = useState(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft",
    tags: "",
  });

  const [loading, setLoading] = useState(true);

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    api
      .get(`/api/blogs/edit/${id}`)
      .then((res) => {
        const blog = res.data;

        setForm({
          title: blog.title,
          excerpt: blog.excerpt || "",
          content: blog.content,
          category: blog.category?._id || "",
          status: blog.status,
          tags: blog.tags?.join(", ") || "",
        });

        if (blog.cover?.url) {
          setCoverPreview(blog.cover.url);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* ================= COVER UPLOAD ================= */
  async function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only images allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max 5MB allowed");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);

    const fd = new FormData();
    fd.append("cover", file);

    try {
      setUploadingCover(true);

      const res = await api.put(`/api/blogs/${id}/cover`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCoverPreview(res.data.cover.url);
    } catch {
      alert("Failed to update cover");
    } finally {
      setUploadingCover(false);
    }
  }

  /* ================= REMOVE COVER ================= */
  function removeCover() {
    if (!confirm("Remove cover preview?")) return;
    setCoverPreview(null);
  }

  /* ================= UPDATE BLOG ================= */
  async function handleUpdate() {
    if (updating) return;

    try {
      setUpdating(true);

      const tagsArray = form.tags
        ? form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : ["General"];

      await api.put(`/api/blogs/${id}`, {
        ...form,
        tags: tagsArray,
      });

      navigate("/dashboard");
    } catch {
      alert("Failed to update blog");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <p className="text-center mt-24 text-muted-foreground">
        Loading blog...
      </p>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <div className="card p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

        {/* TITLE */}
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        {/* EXCERPT */}
        <Textarea
          label="Short Description"
          name="excerpt"
          rows={3}
          value={form.excerpt}
          onChange={handleChange}
        />

        {/* COVER IMAGE */}
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
                {uploadingCover ? "Uploading..." : "Change"}
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
                  className="btn-danger rounded-md px-2"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Recommended size: 1200×630 • Max 5MB
          </p>
        </div>

        {/* CATEGORY */}
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

        {/* TAGS */}
        <Input
          label="Tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Separate tags with commas
        </p>

        {/* CONTENT */}
        <Textarea
          label="Content"
          name="content"
          rows={10}
          value={form.content}
          onChange={handleChange}
        />

        {/* STATUS */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="btn bg-primary text-primary-foreground w-full sm:w-auto disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Blog"}
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-outline w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------- INPUT COMPONENT ---------- */

function Input({ label, name, value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
}

/* ---------- TEXTAREA COMPONENT ---------- */

function Textarea({ label, name, rows, value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
        className="input resize-y"
      />
    </div>
  );
}