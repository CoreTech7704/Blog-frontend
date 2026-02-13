import { useState } from "react";
import api from "@/api/axios";
import FloatingLines from "@/components/ui/FloatingLines";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (loading) return;

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="relative min-h-screen bg-background text-foreground
                flex items-center justify-center px-6 pt-32 overflow-hidden
                transition-colors duration-300"
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-70">
        <FloatingLines
          enabledWaves="top,middle,bottom"
          lineDistance={15}
          bendStrength={0.5}
        />
      </div>

      {/* CARD */}
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl p-[2px] w-full max-w-lg">
        <div
          className="rounded-3xl bg-slate-950/90 backdrop-blur-xl
                     shadow-2xl p-10 border border-white/10"
        >
          {!success ? (
            <>
              <h1 className="text-3xl font-bold mb-2 text-center">
                Change Password
              </h1>
              <p className="text-slate-400 text-center mb-8">
                Update your account password
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current Password */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    Current Password
                  </label>
                  <input
                    name="currentPassword"
                    type="password"
                    required
                    value={form.currentPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-3
                               bg-black/40 border border-white/10
                               text-white placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-cyan-500
                               transition"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    New Password
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    required
                    value={form.newPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-3
                               bg-black/40 border border-white/10
                               text-white placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-violet-500
                               transition"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    Confirm New Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-3
                               bg-black/40 border border-white/10
                               text-white placeholder-slate-500
                               focus:outline-none focus:ring-2 focus:ring-violet-500
                               transition"
                  />
                </div>

                {/* Hint */}
                <p className="text-xs text-slate-500">
                  Password should be at least 8 characters long.
                </p>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold
                             bg-gradient-to-r from-cyan-500 to-violet-500
                             text-black hover:scale-[1.03]
                             transition shadow-lg
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-10">
              <h2 className="text-3xl font-bold mb-4">
                Password Updated 🎉
              </h2>
              <p className="text-muted-foreground mb-6">
                Your password has been changed successfully.
              </p>
              <a
                href="/profile"
                className="inline-block rounded-xl px-6 py-3
                           bg-gradient-to-r from-cyan-500 to-violet-500
                           text-black font-semibold
                           hover:scale-105 transition"
              >
                Back to Profile
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
