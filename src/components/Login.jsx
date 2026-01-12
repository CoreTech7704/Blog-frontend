import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api/axios";

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });

localStorage.setItem("accessToken", res.data.accessToken);

setUser(res.data.user);

navigate("/");

    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center w-full px-4">
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl p-[2px]">
        <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl shadow-2xl p-10 max-w-xl w-full border border-white/10">
          <h1 className="text-4xl font-bold text-center mb-6">Log in</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
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
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-violet-500 text-black hover:scale-[1.03] transition shadow-xl hover:shadow-cyan-500/25 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link to="/auth?mode=signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
}