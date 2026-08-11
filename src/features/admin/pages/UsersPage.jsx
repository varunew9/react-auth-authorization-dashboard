import { useEffect } from "react";
import useHttp from "../../../hooks/useHttp";

import adminApi from "../services/adminApi";
import { useAuth } from "../../auth/context/useAuth";
import UserTable from "../components/UserTable";

function UsersPage() {
  const { user } = useAuth();

  // Get users
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: errorUsers,
    sendRequest: loadUsers,
  } = useHttp(adminApi.getUsers);

  // Delete User
  const {
    // data: users,
    isLoading: isDeletingUser,
    error: errorDeleteing,
    sendRequest: deleteUser,
  } = useHttp(adminApi.deleteUsers);

  //  Update user role
  const {
    // data: users,
    isLoading: isUpdatingRole,
    error: errorUpdatingRole,
    sendRequest: UpdateUserRole,
  } = useHttp(adminApi.updateUserRole);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  async function handleDeleteUser(userId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;
    try {
      await deleteUser(userId);
      await loadUsers();
    } catch {
      // useHttp already stores the error
    }
  }

  async function handleRoleChange(selectedUser, role) {
    

    try {
      await UpdateUserRole(selectedUser, role);
      // Reload users after successful update
      await loadUsers();
    } catch {
      // useHttp already stores the error
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1 text-dark">Users</h1>
          <p className="text-muted mb-0">Manage Users and their Roles.</p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={loadUsers}
          disabled={isLoadingUsers}
        >
          {isLoadingUsers ? "Loading..." : "Refresh"}
        </button>
      </div>
      {errorDeleteing ||
        errorUpdatingRole ||
        (errorUsers && (
          <div className="alert alert-danger" role="alert">
            {errorDeleteing || errorUpdatingRole || errorUsers}
          </div>
        ))}

      {isLoadingUsers ? (
        <div className="text-clearInterval py-5">
          <div className="spinner-border text-primary" role="status">
            <div className="visually-hidden">Loading...</div>
          </div>
          <p className="text-muted mt-3 mb-0">Loading users...</p>
        </div>
      ) : (
        <UserTable
          users={users || []}
          curresntUserId={user?.id}
          onDelete={handleDeleteUser}
          onRoleChange={handleRoleChange}
          isDeletingUser={isDeletingUser}
          isUpdatingRole={isUpdatingRole}
        />
      )}
    </div>
  );
}

export default UsersPage;
