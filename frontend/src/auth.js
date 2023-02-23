import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [authenticated, setAuthenticated] = useState(false);

  function login() {
    // Set the authenticated flag and store the JWT token.
    setAuthenticated(true);
    localStorage.setItem("token", "token-value");
  }

  function logout() {
    // Clear the authenticated flag and remove the JWT token.
    setAuthenticated(false);
    localStorage.removeItem("token");
  }

  const value = {
    authenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}
