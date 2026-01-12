import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .get(`/api/auth/verify-email/${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      {status === "loading" && (
        <p className="text-slate-400">Verifying your email…</p>
      )}

      {status === "success" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-400">
            Email verified 🎉
          </h1>
          <p className="mt-4 text-slate-300">
            You can now log in to your account.
          </p>
          <Link
            to="/auth?mode=login"
            className="inline-block mt-6 px-6 py-3 rounded-xl
              bg-gradient-to-r from-cyan-500 to-violet-500 text-black font-semibold"
          >
            Go to Login
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400">
            Invalid or expired link
          </h1>
          <p className="mt-4 text-slate-400">
            Please request a new verification email.
          </p>
        </div>
      )}
    </main>
  );
}
