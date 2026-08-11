import apiClient from "../../../services/apiClient";

async function signup(userData) {
  const response = await apiClient.post("/register", userData);

  return response.data;
}

async function login(credentials) {
  const response = await apiClient.post("/login", credentials);

  return response.data;
}

async function updateProfile(userId, formData) {
  const response = await apiClient.put(`/users/${userId}`, formData);

  return response.data;
}

// async function updateProfile(user, formData, accessToken) {
//   const response = await apiClient.patch(`/users/${user}`, formData, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   return response.data;
// }

const authApi = {
  signup,
  login,
  updateProfile,
};

export default authApi;
