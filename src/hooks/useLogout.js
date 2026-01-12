import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return async function logout() {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // ignore backend errors, still logout locally
    } finally {
      setUser(null);
      navigate("/auth?mode=login");
    }
  };
}
