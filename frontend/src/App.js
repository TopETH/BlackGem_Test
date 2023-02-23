import React from "react";

import NavBar from "./components/navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";

import { useAuth } from "./services/auth";

const App = () => {
  const { authenticated } = useAuth();

  return (
    <div>
      <NavBar />

      {authenticated ? <Home /> : <Login />}
    </div>
  );
};

export default App;
