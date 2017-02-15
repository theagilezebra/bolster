import React from 'react';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
import { signinOrSignup } from '../actions/userActions';
<<<<<<< ad089a80042a4a6d8f7ea4f1a6c65fcf58af1259
=======
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';
>>>>>>> correct whitespace in landing, signup, signin components
export default function Signin({ dispatch }) {
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
      <FormGroup>
        <ControlLabel>Sign In </ControlLabel>
        <FormControl className="inputsize" placeholder="Enter email" ref={(ref) => { emailInput = ref; }} />
        <FormControl className="inputsize" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }} />
        <button type="submit">Submit</button>
      </FormGroup>
    </form>
  );
}
