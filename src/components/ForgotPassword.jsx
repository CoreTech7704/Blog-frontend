import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex justify-center items-center w-full px-4">
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl p-[2px]">
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

          <form className="space-y-6">
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
              className="w-full py-3 rounded-xl font-semibold
                         bg-gradient-to-r from-cyan-500 to-violet-500
                         text-black hover:scale-[1.03]
                         transition shadow-lg hover:shadow-cyan-500/25"
            >
              Send Reset Link
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Remembered your password?{" "}
            <Link
              to="/login"
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
