// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SpinningLoading from "../common/SpinningLoading";

export default function PrivateRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) return <SpinningLoading />;

  if (!admin) return <Navigate to="/login" replace />;

  return children;
}
