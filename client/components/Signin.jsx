import React from 'react';
import { signinOrSignup } from '../actions/userActions';
import { ControlLabel,FormGroup, FormControl } from 'react-bootstrap';
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
        <FormControl className="inputsize" placeholder="Enter email" ref={(ref) => { emailInput = ref;}}/>
        <FormControl className="inputsize" placeholder="Enter super secret password" ref={(ref) => { passwordInput = ref; }}/>
          <button type="submit">Submit</button>
      </FormGroup>
    </form>
  );
}
