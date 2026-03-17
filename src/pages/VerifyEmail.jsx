import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    async function verify() {
      try {
        await api.get(`/api/auth/verify-email/${token}`);
        setStatus("success");

        setTimeout(() => {
          navigate("/auth?mode=login");
        }, 3000);
      } catch {
        setStatus("error");
      }
    }

    if (token) verify();
  }, [token]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        {status === "loading" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Verifying...</h2>
            <p className="text-slate-400">Please wait</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-400">
              Email Verified ✅
            </h2>
            <p className="text-slate-400">Redirecting to login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              Invalid or Expired Link ❌
            </h2>
            <p className="text-slate-400 mb-4">
              Please request a new verification email.
            </p>

            <button
              onClick={() => navigate("/auth")}
              className="auth-primary-btn"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </main>
  );
}
