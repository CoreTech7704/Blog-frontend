import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { getImageUrl } from "@/utils/getImageUrl";
import { useAuth } from "@/hooks/useAuth";

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    api
      .get("/api/user/me")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-24 text-muted-foreground">
        Loading profile...
      </p>
    );
  }

  const { user, stats } = data;

  async function handleDeleteAccount() {
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
      <div className="card p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Avatar */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-muted flex items-center justify-center">
            <img
              src={getImageUrl(user.avatar) || "/default-avatar.png"}
              alt="avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.fullname}</h1>
            <p className="mt-1 text-muted-foreground">
              @{user.username}
            </p>
            <p className="text-muted-foreground">
              {user.email}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Link
                to="/editprofile"
                className="btn bg-primary text-primary-foreground w-full sm:w-auto"
              >
                Edit Profile
              </Link>

              <Link
                to="/dashboard"
                className="btn-outline w-full sm:w-auto"
              >
                My Blogs
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <StatCard label="Blogs" value={stats.blogs} />
          <StatCard label="Role" value={user.role} />
          <StatCard
            label="Joined"
            value={new Date(user.createdAt).getFullYear()}
          />
        </div>

        {/* Bio */}
        <div className="surface mt-8 p-6">
          <h2 className="font-semibold text-lg">About</h2>
          <p className="mt-3 text-muted-foreground">
            {user.bio || "No bio added yet."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link
            to="/change-password"
            className="btn bg-primary text-primary-foreground w-full sm:w-auto"
          >
            Change Password
          </Link>

          <button
            onClick={handleDeleteAccount}
            disabled={deleting}
            className={`btn w-full sm:w-auto
              ${
                deleting
                  ? "bg-destructive/60 cursor-not-allowed"
                  : "bg-destructive text-destructive-foreground hover:opacity-90"
              }
            `}
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
    <div className="surface p-5 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
}
