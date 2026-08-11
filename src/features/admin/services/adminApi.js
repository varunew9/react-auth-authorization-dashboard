import apiClient from "../../../services/apiClient";

async function getUsers() {
  const response = await apiClient.get("/users");

  return response.data;
}

async function deleteUsers(id) {
  const response = await apiClient.delete(`/users/${id}`);

  return response.data;
}

async function updateUserRole(user, userRole) {
  const response = await apiClient.patch(`/users/${user.id}`, {
    role: userRole,
  });

  return response.data;
}

const adminApi = {
  getUsers,
  deleteUsers,
  updateUserRole,
};

export default adminApi;
