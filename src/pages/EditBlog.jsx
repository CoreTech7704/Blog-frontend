import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/api/axios";

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft",
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
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  /* ================= UPDATE ================= */
  async function handleUpdate() {
    try {
      await api.put(`/api/blogs/${id}`, form);
      navigate("/dashboard");
    } catch {
      alert("Failed to update blog");
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

        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <Textarea
          label="Short Description"
          name="excerpt"
          rows={3}
          value={form.excerpt}
          onChange={handleChange}
        />

        <Textarea
          label="Content"
          name="content"
          rows={10}
          value={form.content}
          onChange={handleChange}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
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

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={handleUpdate}
            className="btn bg-primary text-primary-foreground w-full sm:w-auto"
          >
            Update Blog
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn-outline w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------- Inputs ---------- */

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
