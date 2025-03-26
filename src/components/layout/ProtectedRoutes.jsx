import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";

/**
 * Route guard for regular users
 * Only checks authentication status and redirects to login if needed
 */
export function UserProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

/**
 * Route guard for organization admins
 * Checks authentication and org admin role
 */
export function OrgAdminProtectedRoute() {
  const { isAuthenticated, isOrgAdmin, isSystemAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // System admins should also be able to access org admin routes
  if (!isOrgAdmin && !isSystemAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

/**
 * Route guard for system admins
 * Checks authentication and system admin role
 */
export function SystemAdminProtectedRoute() {
  const { isAuthenticated, isSystemAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isSystemAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
