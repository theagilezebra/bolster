import React from 'react';
import { connect } from 'react-redux';
import { signinOrSignup } from '../actions/userActions';

const Signup = ({ dispatch }) => {
  let emailInput = null;
  let passwordInput = null;
  let firstNameInput = null;
  let lastNameInput = null;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinOrSignup({
      email: emailInput.value,
      password: passwordInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
    }));
  };

  return (
    <form action="#" onSubmit={submitHandler} className="quicksand">
      <h3>{'Don\'t have an account? Sign up to get started!'}</h3>
      <div>
        <input className="inputsize inputmargin" placeholder="Enter email" ref={(ref) => { emailInput = ref; }} />
      </div>
      <div>
        <input className="inputsize inputmargin" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }} />
      </div>
      <div>
        <input className="inputsize inputmargin" placeholder="Enter first name" ref={(ref) => { firstNameInput = ref; }} />
      </div>
      <div>
        <input className="inputsize inputmargin" placeholder="Enter lastname" ref={(ref) => { lastNameInput = ref; }} />
      </div>
      <button type="submit" className="btn btn-success submitbutton green">Signup</button>
    </form>
  );
};

export default connect(null)(Signup);
