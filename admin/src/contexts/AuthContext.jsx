import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const check = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/check");
      if (res?.data?.success) {
        setAdmin({ id: res.data.admin_id, username: res.data.username });
      } else {
        setAdmin(null);
      }
    } catch (err) {
      console.error(err);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  const logout = useCallback(() => {
    setAdmin(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, check, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
