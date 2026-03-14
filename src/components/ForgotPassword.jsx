import { Link } from "react-router-dom";
import { useState } from "react";
import api from "@/api/axios";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;

    try {
      const res = await api.post("/api/auth/forgot-password", { email });

      setMessage(res.data.message);
      e.target.reset();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <section className="bg-linear-to-r from-cyan-500 to-violet-500 rounded-3xl p-0.5">
        <div
          className="rounded-3xl bg-slate-950/90 backdrop-blur-xl
                     shadow-2xl p-10 max-w-xl w-full
                     border border-white/10"
        >
          <h1 className="text-4xl font-bold text-center mb-4">
            Forgot Password
          </h1>

          <p className="text-center text-slate-400 mb-8">
            Enter your email and we’ll send you a password reset link.
          </p>

          {message && <p className="text-green-400 text-center">{message}</p>}
          <form className="space-y-6" onSubmit={handleForgot}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg px-4 py-3
                           bg-black/40 border border-white/10
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-cyan-500
                           transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold
                         bg-linear-to-r from-cyan-500 to-violet-500
                         text-black hover:scale-[1.03]
                         transition shadow-lg hover:shadow-cyan-500/25"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Remembered your password?{" "}
            <Link
              to="/auth?mode=login"
              className="text-cyan-400 hover:underline"
            >
              Log in
            </Link>
          </div>

          {/* INFO */}
          <p className="mt-6 text-center text-xs text-slate-500">
            If an account exists for this email, you’ll receive a reset link.
          </p>
        </div>
      </section>
    </div>
  );
}
