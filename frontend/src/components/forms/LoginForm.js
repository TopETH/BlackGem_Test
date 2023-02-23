import React, { useState } from "react";

const LoginForm = (props) => {
  const initialFormState = { email: "", password: "" };
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!user.email || !user.password) return;

    props.login(user);
    setUser(initialFormState);
  };

  return (
    <div className='row'>
      <form className='col s12' onSubmit={submitForm}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='text'
              id='email'
              name='email'
              value={user.email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='email'>Email</label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='password'
              id='password'
              name='password'
              value={user.password}
              onChange={handleInputChange}
              required
            />
            <label htmlFor='password'>Password</label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s12'>
            <button className='waves-effect waves-light btn'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
