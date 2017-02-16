import React from 'react';
import { connect } from 'react-redux';
import { signinOrSignup } from '../actions/userActions';
<<<<<<< 07e5b2b89ec8aa6d05d3fbfd6bcf3fa0acf30393

const Signin = ({ dispatch }) => {
=======
export default function Signin({ dispatch }) {
>>>>>>> add classes to signin/ signup component
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
<<<<<<< 07e5b2b89ec8aa6d05d3fbfd6bcf3fa0acf30393
    <form action="#" onSubmit={submitHandler}>
      <input className="inputsize" placeholder="Enter email" ref={(ref) => { emailInput = ref; }} />
      <input className="inputsize" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }} />
      <button type="submit">Submit</button>
=======
    <form action="#" onSubmit={submitHandler} className="quicksand">
      <FormGroup>
        <ControlLabel>Sign In </ControlLabel>
        <FormControl className="inputsize" placeholder="Enter email" ref={(ref) => { emailInput = ref; }} />
        <FormControl className="inputsize" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }} />
        <button type="submit" className="btn btn-success submitbutton green">Submit</button>
      </FormGroup>
>>>>>>> add classes to signin/ signup component
    </form>
  );
};

export default connect(null)(Signin);
