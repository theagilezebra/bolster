import React from 'react';
import { connect } from 'react-redux';
import { signinOrSignup } from '../actions/userActions';

const Signup = ({ dispatch }) => {
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
      <input className="inputsize" placeholder="Enter email" ref={(ref) => { emailInput = ref; }} />
      <input className="inputsize" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }} />
      <button type="submit" className="btn btn-success submitbutton green">Submit</button>
    </form>
  );
};

export default connect(null)(Signup);
