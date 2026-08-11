function UserTable({
  users,
  currentUserId,
  onDelete,
  onRoleChange,
  isDeleting,
  isUpdatingRole,
}) {
  if (users.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No users found.
      </div>
    );
  }

  // function handleDelete(user) {
  //   const confirmed = window.confirm(
  //     `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
  //   );

  //   if (!confirmed) {
  //     return;
  //   }

  //   onDelete(user.id);
  // }

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                const isCurrentUser = user.id === currentUserId;

                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>

                    <td>
                      {user.firstName} {user.lastName}
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={user.role || "user"}
                        disabled={isCurrentUser || isUpdatingRole}
                        onChange={(event) =>
                          onRoleChange(user, event.target.value)
                        }
                        style={{ maxWidth: "130px" }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        disabled={isCurrentUser || isDeleting}
                        onClick={() => onDelete(user.id)}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
