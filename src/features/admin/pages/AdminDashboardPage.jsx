import { useEffect, useMemo } from "react";
import useHttp from "../../../hooks/useHttp";
import adminApi from "../services/adminApi";

function AdminDashboardPage() {
  const {
    data: users,
    isLoading,
    error,
    sendRequest: loadUsers,
  } = useHttp(adminApi.getUsers);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const statistics = useMemo(() => {
    const totalUsers = users?.length ?? 0;

    const adminUsers =
      users?.filter((user) => user.role === "admin").length ?? 0;

    const regularUsers =
      users?.filter((user) => user.role === "user").length ?? 0;

    return {
      totalUsers,
      adminUsers,
      regularUsers,
    };
  }, [users]);

  const recentUsers = useMemo(() => {
    if (!users) {
      return [];
    }

    return [...users].sort((a, b) => b.id - a.id).slice(0, 5);
  }, [users]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>

        <p className="mt-2 text-muted">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="h3 mb-1 text-dark">Admin Dashboard</h1>
        <p className="text-muted mb-0">Overview of your application users.</p>
      </div>

      {/* Statistics */}
      <div className="row g-4 mb-4">
        {/* Total Users */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Total Users</p>

              <h2 className="display-6 fw-semibold mb-0">
                {statistics.totalUsers}
              </h2>
            </div>
          </div>
        </div>

        {/* Admin Users */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Admin Users</p>

              <h2 className="display-6 fw-semibold mb-0 text-danger">
                {statistics.adminUsers}
              </h2>
            </div>
          </div>
        </div>

        {/* Regular Users */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Regular Users</p>

              <h2 className="display-6 fw-semibold mb-0 text-primary">
                {statistics.regularUsers}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Recent Users</h2>

            <span className="badge text-bg-secondary">Latest 5</span>
          </div>

          {recentUsers.length === 0 ? (
            <p className="text-muted mb-0">No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "text-bg-danger"
                              : "text-bg-primary"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
