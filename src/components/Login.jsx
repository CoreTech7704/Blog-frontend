import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api/axios";
import TermsPolicyModal from "@/components/TermsPolicyModal";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex justify-center items-center min-h-screen px-4">
      <section className="bg-linear-to-r from-cyan-500 to-violet-500 rounded-3xl p-0.5">
        <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl shadow-2xl p-10 max-w-xl w-full border border-white/10">
          <h1 className="text-4xl font-bold text-center mb-6">Log in</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <div>
              <label className="block mb-2 text-sm text-slate-300">Email</label>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg px-4 py-3 bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
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
              className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-cyan-500 to-violet-500 text-black hover:scale-[1.03] transition shadow-xl hover:shadow-cyan-500/25 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link
              to="/auth?mode=signup"
              className="text-cyan-400 hover:underline"
            >
              Sign up
            </Link>
          </div>

          <p className="mt-2 text-center text-xs text-slate-500">
            By continuing, you agree to our{" "}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-cyan-400 hover:underline"
            >
              Terms & Privacy Policy
            </button>
            .
          </p>

          <p className="mt-2 text-center text-xs text-slate-500">
            Your information is secure and never shared.
          </p>
        </div>
      </section>
      <TermsPolicyModal open={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
