import { useState } from "react";
import FloatingLines from "@/components/ui/FloatingLines";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [expired, setExpired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post("/api/auth/reset-password", {
        token,
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/auth?mode=login");
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to reset password";

      if (message.toLowerCase().includes("expired")) {
        setExpired(true);
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
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
      <section className="relative w-full max-w-lg rounded-3xl bg-linear-to-r from-cyan-500 to-violet-500 p-0.5">
        <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-white/10 shadow-2xl p-6 sm:p-10">
          {expired ? (
            <div className="text-center py-8 sm:py-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Reset Link Expired
              </h2>

              <p className="text-slate-400 mb-6">
                This password reset link is invalid or has expired. Please
                request a new one.
              </p>

              <button
                onClick={() => navigate("/forgot-password")}
                className="auth-primary-btn inline-flex justify-center"
              >
                Request New Reset Link
              </button>
            </div>
          ) : !success ? (
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
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      className="w-full rounded-lg px-4 py-3
                           bg-black/40 border border-white/10
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-cyan-500
                           transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2
                      text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 text-sm text-slate-300">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      required
                      className="w-full rounded-lg px-4 py-3
                           bg-black/40 border border-white/10
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-cyan-500
                           transition"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2
                      text-slate-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Password must be at least 8 characters.
                </p>

                {error && <p className="text-sm text-red-400">{error}</p>}

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

              <button
                onClick={() => navigate("/auth?mode=login")}
                className="auth-primary-btn inline-flex justify-center"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
