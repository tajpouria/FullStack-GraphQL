import React, { useState } from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { loginQuery, signupQuery } from '../queries';

function Form({ signup, login }) {
  const [auth, setAuth] = useState('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event, input) => {
    const { value } = event.target;
    input === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <form className="container">
      <div className="display-4">{auth}</div>
      <div className="form-group">
        <label htmlFor="Email">
          Email address
          <input
            value={email}
            onChange={() => handleInputChange(event, 'email')}
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            autoComplete="username"
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="Password">
          Password
          <input
            value={password}
            onChange={() => handleInputChange(event)}
            type="password"
            className="form-control"
            placeholder="Password"
            autoComplete="current-password"
          />
        </label>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <button
        onClick={(event) => {
          event.preventDefault();

          setError('');

          const option = {
            variables: { email, password },
          };
          auth === 'Signup'
            ? signup(option)
              .then(res => console.log(res))
              .catch((ex) => {
                setError(ex.graphQLErrors[0].message);
              })
            : login(option)
              .then(res => console.log(res))
              .catch((ex) => {
                setError(ex.graphQLErrors[0].message);
              });
        }}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
      <button
        type="button"
        className="btn"
        onClick={(event) => {
          event.preventDefault();
          auth === 'Login' ? setAuth('Signup') : setAuth('Login');
        }}
      >
        {auth === 'Login'
          ? 'Do not have an account yet! SignUp now'
          : 'Already have an account. Login'}
      </button>
    </form>
  );
}

Form.propTypes = {
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};

export default compose(
  graphql(loginQuery, { name: 'login' }),
  graphql(signupQuery, { name: 'signup' }),
)(Form);
