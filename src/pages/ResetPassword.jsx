import { useState } from "react";
import FloatingLines from "@/components/ui/FloatingLines";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Backend later:
    // POST /auth/reset-password { token, newPassword }

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 overflow-hidden bg-black text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <FloatingLines
          enabledWaves="top,middle,bottom"
          lineDistance={15}
          bendStrength={0.5}
        />
      </div>

      {/* CARD */}
      <section className="relative w-full max-w-lg rounded-3xl bg-gradient-to-r from-cyan-500 to-violet-500 p-[2px]">
        <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl p-6 sm:p-10">
          {!success ? (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
                Reset Password
              </h1>

              <p className="text-slate-400 text-center mb-8 text-sm sm:text-base">
                Set a new password for your account
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    className="auth-input"
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
                    className="auth-input"
                  />
                </div>

                <p className="text-xs text-slate-500">
                  Password must be at least 8 characters.
                </p>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  disabled={loading}
                  className="auth-primary-btn disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          ) : (
            /* SUCCESS */
            <div className="text-center py-8 sm:py-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Password Reset Successful.
              </h2>

              <p className="text-slate-400 mb-6">
                You can now log in with your new password.
              </p>

              <a
                href="/login"
                className="auth-primary-btn inline-flex justify-center"
              >
                Go to Login
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
