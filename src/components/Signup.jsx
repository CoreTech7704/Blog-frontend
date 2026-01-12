import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  if (password.length < 8) {
    return setError("Password must be at least 8 characters");
  }

  if (password !== confirmPassword) {
    return setError("Passwords do not match");
  }

  try {
    setLoading(true);

    await api.post("/api/auth/signup", {
      fullname,
      username: email.split("@")[0], // ✅ simple default
      email,
      password,
    });

    // ✅ DO NOT setUser
    // ✅ DO NOT go to dashboard
    navigate("/auth?mode=login");
  } catch (err) {
    setError(err.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="flex justify-center items-center w-full px-4">
      <section className="bg-gradient-to-r from-cyan-500 to-violet-500 rounded-3xl p-[2px]">
        <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl shadow-2xl p-10 max-w-xl w-full border border-white/10">
          <h1 className="text-4xl font-bold text-center mb-6">Sign up</h1>

          {error && (
            <p className="text-sm text-red-400 text-center mb-4">
              {error}
            </p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input label="Full Name" value={fullname} onChange={setFullname} />
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-cyan-500 to-violet-500
              text-black hover:scale-[1.03] transition
              disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/auth?mode=login" className="text-cyan-400 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Input Component ---------- */

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm text-slate-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-lg px-4 py-3
        bg-black/40 border border-white/10
        text-white placeholder-slate-500
        focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
      />
    </div>
  );
}
