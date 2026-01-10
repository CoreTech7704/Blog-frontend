import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProfileEdit() {
  const navigate = useNavigate()

  // mock existing user data
  const [form, setForm] = useState({
    name: "Harsh Panchal",
    title: "Full-Stack Developer",
    about:
      "I am a full-stack developer who loves building scalable web applications and clean user interfaces.",
    github: "github.com/harshpanchal",
    linkedin: "linkedin.com/in/harshpanchal",
    email: "harsh@example.com",
  })

  const [avatarPreview, setAvatarPreview] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
  }

  function handleSubmit(e) {
    e.preventDefault()

    // later: send data to backend
    console.log("Updated profile:", form)

    navigate("/profile")
  }

  return (
    <main className="max-w-3xl mx-auto px-4 my-24">
      <form
        onSubmit={handleSubmit}
        className="
          bg-slate-100 dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl p-8
        "
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
            <div
              className="
                w-24 h-24 rounded-full
                bg-slate-300 dark:bg-slate-700
                flex items-center justify-center
                overflow-hidden
              "
            >
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

            <label
              className="
                cursor-pointer px-4 py-2 rounded-md
                border border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-800
                transition-colors
              "
            >
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

        {/* Name */}
        <Input
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        {/* Title */}
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        {/* About */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            About Me
          </label>
          <textarea
            name="about"
            rows="4"
            value={form.about}
            onChange={handleChange}
            className="
              mt-1 w-full rounded-md
              bg-white dark:bg-slate-800
              border border-slate-300 dark:border-slate-700
              text-slate-900 dark:text-slate-100
              p-3 focus:outline-none focus:ring-2 focus:ring-sky-400
            "
          />
        </div>

        {/* Connect */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Connect
          </h2>

          <Input
            label="GitHub"
            name="github"
            value={form.github}
            onChange={handleChange}
          />

          <Input
            label="LinkedIn"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button
            type="submit"
            className="
              px-5 py-2 rounded-md
              bg-sky-400 text-slate-950
              font-medium hover:bg-sky-300
              transition-colors
            "
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
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
