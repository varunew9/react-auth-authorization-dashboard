import { Link } from "react-router";
import { useAuth } from "../../auth/context/useAuth";

function DashboardPage() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-dark">Dashboard</h1>
        <div className="d-flex gap-2">
          <Link to="/profile" className="btn btn-outline-primary">
            My Profile
          </Link>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
          </h5>

          <p className="card-text">You are successfully authenticated.</p>

          <p className="mb-0">
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
