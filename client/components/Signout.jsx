import React from 'react';
import { signout } from '../actions/userActions';

export default function Signout({ dispatch }) {
  return (
    <div>
      <button onClick={(e) => { e.preventDefault(); dispatch(signout); }}>Signout</button>
    </div>
  );
}
