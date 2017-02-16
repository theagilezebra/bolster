import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import css from '../styles/main.css';
import { renderForm } from '../actions/renderActions';
import { toBottom } from '../helpers/scrollHelpers.jsx';

const LandingNav = ({ dispatch }) => (
  <div>
    <Navbar className="greennav">
      <Navbar.Header>
        <Navbar.Brand>
<<<<<<< 3824793e740af6d6ce4b95c5b6a787c1cf817dd2
          <a href="#" className="logo"> Bolster</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav bsStyle="pills" >
        <NavItem onSelect={toBottom} className="navchoice">SignIn</NavItem>
=======
          <a href="#">Bolster</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav bsStyle="pills">
        <NavItem onSelect={function () { dispatch(renderForm(this.children)); toBottom(); }}>Signin</NavItem>
        <NavItem onSelect={function () { dispatch(renderForm(this.children)); toBottom(); }}>Signup</NavItem>
>>>>>>> Conditionally render Signin/signup form in Landing
      </Nav>
    </Navbar>
  </div>
);

export default connect(null)(LandingNav);
