import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const storedAuth = localStorage.getItem("auth");
      if (storedAuth) {
        const auth = JSON.parse(storedAuth);

        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
      }
    } catch (error) {
      console.error("Failed to read auth from localStorage:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle authentication/authorization errors globally

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    if (
      status === 401 &&
      requestUrl !== "/login" &&
      requestUrl !== "/register"
    ) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }

    if (status === 403) {
      console.error("Access denied.");
    }
    return Promise.reject(error);
  }
);
export default apiClient;
