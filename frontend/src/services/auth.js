import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [authenticated, setAuthenticated] = useState(false);

  function login(token) {
    // Set the authenticated flag and store the JWT token.
    localStorage.setItem("token", token);
    setAuthenticated(true);
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

export function useAuth() {
  return useContext(AuthContext);
}

export function getToken() {
  return localStorage.getItem("token");
}
