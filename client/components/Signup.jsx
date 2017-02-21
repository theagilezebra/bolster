import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/userActions';

const Signup = ({ dispatch, error }) => {
  let emailInput = null;
  let passwordInput = null;
  let firstNameInput = null;
  let lastNameInput = null;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signup({
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
        <input
          required
          type="email"
          maxLength="50"
          className="inputsize inputmargin"
          placeholder="Enter email"
          ref={(ref) => { emailInput = ref; }}
        />
      </div>
      <div>
        <input
          required
          type="password"
          minLength="8"
          maxLength="128"
          className="inputsize inputmargin"
          placeholder="Enter super secret password"
          ref={(ref) => { passwordInput = ref; }}
        />
      </div>
      <div>
        <input
          required
          type="text"
          maxLength="35"
          className="inputsize inputmargin"
          placeholder="Enter first name"
          ref={(ref) => { firstNameInput = ref; }}
        />
      </div>
      <div>
        <input
          required
          type="text"
          maxLength="35"
          className="inputsize inputmargin"
          placeholder="Enter lastname"
          ref={(ref) => { lastNameInput = ref; }}
        />
      </div>
      <p className="error-message">{error}</p>
      <button type="submit" className="btn btn-success submitbutton green">Signup</button>
    </form>
  );
};

export default connect((state => ({
  error: state.error.signup,
})), null)(Signup);
