import { connect } from 'react-redux';
import React from 'react';
import Signout from './Signout.jsx';

const NavBar = props => (
  <div>
    {/*
      if session exists
        display signout button
      else assume user is on landing page
        display signin/signup buttons (which on click will jump down the landing page)
    */}
  </div>
);

export default connect((state => ({
  // allow signing out from any view the navbar is in, destroy the session here
})))(NavBar);
