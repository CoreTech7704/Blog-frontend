import { useState } from "react";
import FloatingLines from "@/components/ui/FloatingLines";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 🔗 Backend later
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  return (
    <main
      className="relative min-h-screen bg-black text-white
                 flex items-center justify-center px-6 pt-32 overflow-hidden"
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
                    type="password"
                    required
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
                    type="password"
                    required
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
                    type="password"
                    required
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
              <p className="text-slate-400 mb-6">
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
