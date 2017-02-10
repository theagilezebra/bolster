import { connect } from 'react-redux';
import React from 'react';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import Signout from './Signout.jsx';

const NavBar = props => (
  <div>
    {/**/}
  </div>
);

export default connect((state => ({
  // some stuff to connect a session to this user
})))(NavBar);
