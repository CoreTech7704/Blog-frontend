import { Link } from "react-router-dom"

export default function Profile() {
  // mock data for now
  const user = {
    name: "Harsh Panchal",
    title: "Full-Stack Developer",
    username: "@harshpanchal",
    avatar: null,
    stats: {
      blogs: 24,
      followers: "1.2K",
      following: 530,
    },
    about:
      "I am a full-stack developer who loves building scalable web applications and clean user interfaces.",
    connect: [
      "github.com/harshpanchal",
      "linkedin.com/in/harshpanchal",
      "harsh@example.com",
    ],
  }

  return (
    <main className="max-w-6xl mx-auto px-4 mt-24 mb-10">
      {/* Profile Card */}
      <div
        className="
          bg-slate-100 dark:bg-slate-900
          border border-slate-200 dark:border-slate-800
          rounded-2xl p-8
        "
      >
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className="
                w-28 h-28 rounded-full
                bg-slate-300 dark:bg-slate-700
                flex items-center justify-center
                text-slate-600 dark:text-slate-300
              "
            >
              Avatar
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {user.name}
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {user.title}
            </p>

            <p className="text-slate-500 dark:text-slate-500 mt-2">
              {user.username}
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-5">
              <Link
                to="/profile/edit"
                className="
                  px-4 py-2 rounded-md
                  bg-sky-400 text-slate-950
                  font-medium
                  hover:bg-sky-300 transition-colors
                "
              >
                Edit Profile
              </Link>

              <Link
                to="/dashboard"
                className="
                  px-4 py-2 rounded-md
                  border border-slate-300 dark:border-slate-700
                  text-slate-700 dark:text-slate-300
                  hover:bg-slate-200 dark:hover:bg-slate-800
                  transition-colors
                "
              >
                View Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <StatCard label="Published Blogs" value={user.stats.blogs} />
          <StatCard label="Followers" value={user.stats.followers} />
          <StatCard label="Following" value={user.stats.following} />
        </div>

        {/* Bottom Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* About */}
          <div
            className="
              bg-slate-200 dark:bg-slate-800
              rounded-xl p-6
            "
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              About Me
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mt-3">
              {user.about}
            </p>
          </div>

          {/* Connect */}
          <div
            className="
              bg-slate-200 dark:bg-slate-800
              rounded-xl p-6
            "
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Connect
            </h2>

            <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
              {user.connect.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ label, value }) {
  return (
    <div
      className="
        bg-slate-200 dark:bg-slate-800
        rounded-xl p-5 text-center
      "
    >
      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
        {label}
      </div>
    </div>
  )
}
