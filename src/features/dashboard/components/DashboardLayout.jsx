import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../auth/context/useAuth";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }
  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <header className="navbar navbar-dark bg-dark">
        <div className="container">
          {/* Brand */}
          <Link to={"/dashboard"} className="navbar-brand fw-semibold">
            Auth App
          </Link>
          {/* Navigation */}
          <nav className="d-flex gap-3">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-white" : "text-secondary"}`
              }
            >
              DashBoard
            </NavLink>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "text-white" : "text-secondary"}`
              }
            >
              Profile
            </NavLink>
            {user?.role === "admin" && (
              <>
                <NavLink
                  to={"/admin"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-white" : "text-secondary"}`
                  }
                  end
                >
                  Admin
                </NavLink>

                <NavLink
                  to={"/admin/users"}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-white" : "text-secondary"}`
                  }
                >
                  Users
                </NavLink>
              </>
            )}
          </nav>

          {/* User + Logout */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">
              {user?.firstName} {user?.lastName}
            </span>
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Protected Page Content */}

      <div className="container py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
