import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import LoginPage from "./features/auth/pages/LoginPage";
import SignupPage from "./features/auth/pages/SignupPage";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import DashboardLayout from "./features/dashboard/components/DashboardLayout";
import RoleRoute from "./features/auth/components/RoleRoute";
import UsersPage from "./features/admin/pages/UsersPage";
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          // Admin-only routes
          {
            element: <RoleRoute allowedRoles={["admin"]} />,
            children: [
              { path: "/admin/", element: <AdminDashboardPage /> },
              { path: "/admin/users", element: <UsersPage /> },
            ],
          },
        ],
      },
    ],
  },

  // Unknown route
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
