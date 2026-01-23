import axios from "axios";

const api = axios.create({
  timeout: 15000,
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* ================= REQUEST ================= */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ================= RESPONSE ================= */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 🚫 STOP infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      localStorage.getItem("accessToken") // user must have logged in before
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/auth/refresh");

        localStorage.setItem("accessToken", res.data.accessToken);
        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/auth?mode=login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
