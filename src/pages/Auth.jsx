import { useSearchParams } from "react-router-dom";
import FloatingLines from "@/components/ui/FloatingLines";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ForgotPassword from "../components/ForgotPassword";

export default function Auth() {
  const [params] = useSearchParams();
  const mode = params.get("mode") || "login";

  return (
    <main className="
      relative min-h-screen
      bg-black
      text-white
      flex items-center justify-center
      px-6 pt-32
      overflow-hidden
      transition-colors duration-300
    ">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-70">
        <FloatingLines enabledWaves="top,middle,bottom" />
      </div>

      <div className="relative z-10 w-full">
        {mode === "login" && <Login />}
        {mode === "signup" && <Signup />}
        {mode === "forgot" && <ForgotPassword />}
      </div>
    </main>
  );
}