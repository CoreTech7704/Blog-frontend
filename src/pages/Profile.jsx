import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { getImageUrl } from "@/utils/getImageUrl";
import { useAuth } from "@/hooks/useAuth";


export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-24 text-slate-500">Loading profile...</p>
    );
  }

  const { user, stats } = data;

  async function handledeleteaccount() {
    if (deleting) return;
    const ok = window.confirm(
      "This will permanently delete your account and all data. Are you sure?"
    );
    if (!ok) return;

    setDeleting(true);
    try {
      await api.post("/api/auth/deleteaccount");
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/auth?mode=login");
    }
  }


  return (
    <main className="max-w-6xl mx-auto px-4 mt-24 mb-10">
      <div className="bg-slate-100 dark:bg-slate-900 border rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-slate-300 flex items-center justify-center">
            <img
              src={getImageUrl(user.avatar) || "/default-avatar.png"}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.fullname}</h1>

            <p className="text-slate-500 mt-1">@{user.username}</p>

            <p className="text-slate-400 mt-1">{user.email}</p>

            <div className="flex gap-3 mt-5">
              <Link
                to="/editprofile"
                className="px-4 py-2 bg-sky-400 rounded-md font-medium"
              >
                Edit Profile
              </Link>

              <Link to="/dashboard" className="px-4 py-2 border rounded-md">
                My Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <StatCard label="Blogs" value={stats.blogs} />
          <StatCard label="Role" value={user.role} />
          <StatCard
            label="Joined"
            value={new Date(user.createdAt).getFullYear()}
          />
        </div>

        {/* Bio */}
        <div className="mt-8 bg-slate-200 dark:bg-slate-800 rounded-xl p-6">
          <h2 className="font-semibold text-lg">About</h2>
          <p className="mt-3">{user.bio || "No bio added yet."}</p>
        </div>

        <div className="flex gap-3 mt-5">
          <Link
            to="/change-password"
            className="px-4 py-2 bg-sky-400 rounded-md font-medium"
          >
            Change Password
          </Link>

          <button
            onClick={() => {
              handledeleteaccount();
            }}
            disabled={deleting}
            className={`px-4 py-2 rounded-md
              ${deleting ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
              text-white`}
            >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl p-5 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-slate-600 mt-1">{label}</div>
    </div>
  );
}
