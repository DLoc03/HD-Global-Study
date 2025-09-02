import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/check");
        if (res.data.success) {
          setAdmin({ id: res.data.admin_id, username: res.data.username });
        } else {
          setAdmin(null);
          navigate("/login");
        }
      } catch {
        setAdmin(null);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
