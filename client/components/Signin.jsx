import React from 'react';
import { connect } from 'react-redux';
import { signinOrSignup } from '../actions/userActions';

const Signin = ({ dispatch }) => {
  let emailInput = null;
  let passwordInput = null;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinOrSignup({
      email: emailInput.value,
      password: passwordInput.value,
    }));
  };

  return (
    <form action="#" onSubmit={submitHandler}>
      <h3>{'Already have an account? Sign in here!'}</h3>
      <input className="inputsize" placeholder="Enter email" ref={(ref) => { emailInput = ref; }} />
      <input className="inputsize" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }} />
      <button type="submit">Signin</button>
    </form>
  );
};

export default connect(null)(Signin);
