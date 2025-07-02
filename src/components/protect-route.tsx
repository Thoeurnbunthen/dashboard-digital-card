// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "@/store/auth-store";

interface ProtectedRouteProps {
  roles?: string[]; // Optional RBAC roles
}

const ProtectedRoute = ({ roles = [] }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, roles: userRoles } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ If roles are needed but not yet loaded, skip rendering until ready
  const needsRoles = roles.length > 0;
  const rolesLoaded = userRoles.length > 0;

  if (needsRoles && !rolesLoaded) {
    // 🔁 Skip rendering — just return null silently for now
    return null;
  }
  const hasPermission =
    roles.length === 0 || roles.some((role) => userRoles.includes(role));
  if (!hasPermission) return <Navigate to="/unauthorized" replace />;

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
