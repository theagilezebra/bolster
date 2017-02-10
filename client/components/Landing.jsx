import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';

const Landing = props => (
  <div>
    <nav>
      <NavBar />
    </nav>

    <div>
      <Jumbotron1 />
    </div>

    <div>
      <Jumbotron2 />
    </div>

    <div>
      {/*
      <Signup /> or <Signin />
      */}
    </div>
  </div>
);

export default connect(state => ({
  // some stuff to connect a session to this user
  // accept user's input to create a session
}))(Landing);
