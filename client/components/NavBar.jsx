import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import css from '../styles/main.css';
const LandingNav = props => ( // universal navbar renders according to user session status
  <div >
    <Navbar className="greennav" >
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#"> Bolster</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav bsStyle="pills" >
        <NavItem>SignIn</NavItem>
      </Nav>
    </Navbar>
  </div>
);

export default connect(state => ({
  // allow signing out from any view the navbar is in, destroy the session here
}))(LandingNav);



/*
if session exists
  display signout button
else assume user is on landing page
  display signin/signup buttons (which on click will jump down the landing page)
*/