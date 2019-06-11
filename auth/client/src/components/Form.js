import React, { useState } from 'react';
import { compose, graphql } from 'react-apollo';

import { loginQuery, signupQuery } from '../queries';

function Form({ screen, signup, login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event, input) => {
    const { value } = event.target;
    input === 'email' ? setEmail(value) : setPassword(value);
  };

  return (
    <form className="container">
      <div className="display-4">{screen}</div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">
          <input
            value={email}
            onChange={() => handleInputChange(event, 'email')}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">
          Password
          <input
            value={password}
            onChange={() => handleInputChange(event)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            autoComplete="current-password"
          />
        </label>
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();

          const option = {
            variables: { email, password },
          };
          screen === 'signup'
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
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

export default compose(
  graphql(loginQuery, { name: 'login' }),
  graphql(signupQuery, { name: 'signup' }),
)(Form);
