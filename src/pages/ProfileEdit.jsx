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

    if (user.avatar) {
      setAvatarPreview(
        user.avatar.startsWith("http")
          ? user.avatar
          : `${import.meta.env.VITE_API_URL}${user.avatar}`
      );
    }
  });
}, []);


  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // preview instantly
    setAvatarPreview(URL.createObjectURL(file));

    const fd = new FormData();
    fd.append("avatar", file);

    try {
      await api.put("/api/user/me/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch {
      setAvatarPreview(form.avatar); // revert
      alert("Failed to update avatar");
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
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Edit Profile
        </h1>

        {/* Avatar */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Profile Image
          </label>

          <div className="flex items-center gap-4 mt-3">
            <div className="w-24 h-24 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-slate-600 dark:text-slate-300">
                  Avatar
                </span>
              )}
            </div>

            <label className="cursor-pointer px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Full Name */}
        <Input
          label="Full Name"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
        />

        {/* Username */}
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        {/* Bio */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Bio
          </label>
          <textarea
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        {/* Email (read-only) */}
        <Input label="Email" name="email" value={form.email} disabled />

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-sky-400 text-slate-950 font-medium hover:bg-sky-300 transition-colors"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-5 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

/* ================= INPUT ================= */

function Input({ label, name, value, onChange, disabled }) {
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
        disabled={disabled}
        className={`mt-1 w-full rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
