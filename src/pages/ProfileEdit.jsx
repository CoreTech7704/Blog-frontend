import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function ProfileEdit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    bio: "",
    email: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  /* ================= FETCH USER ================= */
  useEffect(() => {
    api.get("/api/user/me").then((res) => {
      const { user } = res.data;

      setForm({
        fullname: user.fullname,
        username: user.username,
        bio: user.bio || "",
        email: user.email,
      });

      if (user.avatar?.url) {
        setAvatarPreview(user.avatar.url);
      }
    });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageChange(e) {
    if (uploading) return;
setUploading(true);

    try {
      const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    const fd = new FormData();
    fd.append("avatar", file);

    try {
      const res = await api.put("/api/user/me/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // replace preview with Cloudinary URL
      if (res.data.avatar?.url) {
        setAvatarPreview(res.data.avatar.url);
      }

      URL.revokeObjectURL(previewUrl);
    } catch {
      URL.revokeObjectURL(previewUrl);
      alert("Failed to update avatar");
    }
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.put("/api/user/me", {
        fullname: form.fullname,
        username: form.username,
        bio: form.bio,
      });

      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <form onSubmit={handleSubmit} className="card">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                onError={() => setAvatarPreview("")}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-sm">Avatar</span>
            )}
          </div>

          <label className="btn btn-outline w-fit cursor-pointer">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {/* Full Name */}
        <Field
          label="Full Name"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
        />

        {/* Username */}
        <Field
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        {/* Bio */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            className="input resize-none"
            placeholder="Tell something about yourself…"
          />
        </div>

        {/* Email */}
        <Field label="Email" name="email" value={form.email} disabled />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="submit"
            className="btn bg-primary text-primary-foreground"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

/* ================= FIELD ================= */

function Field({ label, name, value, onChange, disabled }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      />
    </div>
  );
}
