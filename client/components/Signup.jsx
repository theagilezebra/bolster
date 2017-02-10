import React from 'react';
import { signup } from '../actions/userActions';

export default function Signup({ dispatch }) {
  let emailInput = null;
  let passwordInput = null;

  const submitHandler = (e) => {
    dispatch(signup({
      email: emailInput.value,
      password: passwordInput.value,
    }));
  };

  return (
    <form action="#" onSubmit={submitHandler}>
      <div>
        <input placeholder="Email Address" ref={(ref) => { emailInput = ref; }} />
        <input placeholder="Password" ref={(ref) => { passwordInput = ref; }} />
      </div>
    </form>
  );
}
