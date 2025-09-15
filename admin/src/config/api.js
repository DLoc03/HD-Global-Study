import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Axios instance ---
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

// --------------------
// Hook API (POST, GET, PUT, DELETE)
// --------------------
export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    const start = Date.now();

    try {
      const response = await api(config);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      const elapsed = Date.now() - start;
      const minDelay = 500;
      const remaining = minDelay - elapsed;

      if (remaining > 0) {
        setTimeout(() => setLoading(false), remaining);
      } else {
        setLoading(false);
      }
    }
  }, []);

  const get = useCallback(
    (url, config = {}) => request({ method: "GET", url, ...config }),
    [request],
  );
  const post = useCallback(
    (url, data = {}, config = {}) =>
      request({ method: "POST", url, data, ...config }),
    [request],
  );
  const put = useCallback(
    (url, data = {}, config = {}) =>
      request({ method: "PUT", url, data, ...config }),
    [request],
  );
  const del = useCallback(
    (url, config = {}) => request({ method: "DELETE", url, ...config }),
    [request],
  );

  return { get, post, put, del, loading, error };
}

// --------------------
// Hook Auth
// --------------------
export function useAuth() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const check = useCallback(async () => {
    try {
      const res = await api.get("/auth/check");
      if (res.data.success) {
        setAdmin({ id: res.data.admin_id, username: res.data.username });
        return true;
      } else {
        setAdmin(null);
        navigate("/login");
        return false;
      }
    } catch (err) {
      setAdmin(null);
      navigate("/login");
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Login
  const login = useCallback(
    async ({ username, password }) => {
      const res = await api.post("/auth/login", { username, password });
      if (res.data.success) {
        await check();
      }
      return res.data;
    },
    [check],
  );

  // Logout
  const logout = useCallback(async () => {
    await api.post("/auth/logout");
    setAdmin(null);
    navigate("/login");
  }, [navigate]);

  return { admin, setAdmin, loading, check, login, logout };
}
