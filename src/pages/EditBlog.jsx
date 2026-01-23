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
    return <p className="text-center mt-24 text-slate-500">Loading blog...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
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
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="mt-1 w-full rounded-md p-2"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-sky-400 rounded-md font-medium"
          >
            Update Blog
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 border rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------- Inputs (OUTSIDE component) ---------- */

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
  );
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
  );
}
