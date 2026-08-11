import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";

function RoleRoute({ allowedRoles }) {
  const { user } = useAuth();

  // Not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but not authorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized
  return <Outlet />;
}

export default RoleRoute;
