import React from "react";
import qs from "querystring";

import api from "../services/api";
import { useAuth } from "../services/auth";

import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const { login: signIn } = useAuth();

  const login = (user) => {
    api.patch("api", qs.stringify(user)).then((res) => {
      signIn(res.data.token);
    });
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12 l6'>
          <h4>Login</h4>
          <LoginForm login={login} />
        </div>
      </div>
    </div>
  );
};

export default Login;
