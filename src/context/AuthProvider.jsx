import { useEffect, useState } from "react";
import api from "@/api/axios";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null); // guest
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
