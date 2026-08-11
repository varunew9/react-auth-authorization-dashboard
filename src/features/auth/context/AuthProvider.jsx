import { AuthContext } from "./AuthContext";
import useLocalStorage from "../../../hooks/useLocalStorage";

export function AuthProvider({ children }) {
  const [auth, setAuth, removeAuth] = useLocalStorage("auth", null);

  function loginUser(authData) {
    setAuth(authData);
  }

  function logoutUser() {
    removeAuth();
  }

  function updateUser(updatedUser) {
    setAuth((previousAuth) => ({
      ...previousAuth,
      user: updatedUser,
    }));
  }

  const contextValue = {
    user: auth?.user ?? null,
    accessToken: auth?.accessToken ?? null,
    isAuthenticated: Boolean(auth?.accessToken),
    loginUser,
    logoutUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
