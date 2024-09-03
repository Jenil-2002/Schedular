import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

// HOOK

export default function AuthGuard({ isAuthenticated, children }) {
  const { pathname } = useLocation();


  if (isAuthenticated) return <>{children}</>;

  return <Navigate replace to="/login" state={{ from: pathname }} />;
}
