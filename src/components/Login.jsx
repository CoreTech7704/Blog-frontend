import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-full px-4">
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl p-[2px]">
        <div
          className="rounded-3xl bg-slate-950/90 backdrop-blur-xl
                     shadow-2xl p-10 max-w-xl w-full
                     border border-white/10"
        >
          <h1 className="text-4xl font-bold text-center mb-6">Log in</h1>

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

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full rounded-lg px-4 py-3
                             bg-black/40 border border-white/10
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-violet-500
                             transition"
              />
            </div>

            <div className="text-right">
              <Link
                to="/auth?mode=forgot"
                className="text-sm text-slate-400 hover:text-white transition"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-cyan-500 to-violet-500
                           text-black hover:scale-[1.03]
                           transition shadow-xl hover:shadow-cyan-500/25"
            >
              Log In
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link to="/auth?mode=signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </div>

          {/* LEGAL */}
          <p className="mt-6 text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-slate-300 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-slate-300 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
