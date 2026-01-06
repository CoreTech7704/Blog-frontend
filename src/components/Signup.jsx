import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex justify-center items-center w-full px-4">
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl p-[2px]">
        <div
          className="rounded-3xl bg-slate-950/90 backdrop-blur-xl
                     shadow-2xl p-10 max-w-xl w-full
                     border border-white/10"
        >
          <h1 className="text-4xl font-bold text-center mb-6">Sign up</h1>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="FullName"
                className="block mb-2 text-sm text-slate-300"
              >
                Full Name
              </label>
              <input
                id="FullName"
                type="text"
                placeholder="John Doe"
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
              <p className="text-xs text-slate-500">
                Password must be at least 8 characters long.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm text-slate-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-cyan-500 to-violet-500
                           text-black hover:scale-[1.03]
                           transition shadow-xl hover:shadow-cyan-500/25"
            >
              Sign Up
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/auth?mode=login" className="text-cyan-400 hover:underline">
              Log in
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
