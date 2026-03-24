import { useEffect, useState } from "react";
import api from "@/api/axios";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("accessToken");

      // 🚀 Skip request if not logged in
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("accessToken"); // cleanup
          setUser(null);
        } else {
          console.error("Auth check failed:", err);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
