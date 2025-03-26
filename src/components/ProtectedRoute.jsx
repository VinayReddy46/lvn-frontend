import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function OrgAdminRoute() {
  const { isAuthenticated, isOrgAdmin, isSystemAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isOrgAdmin && !isSystemAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export function SystemAdminRoute() {
  const { isAuthenticated, isSystemAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isSystemAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
