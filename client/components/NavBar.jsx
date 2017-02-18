import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import css from '../styles/main.css';
import renderForm from '../actions/renderActions';
import { signout } from '../actions/userActions';
import { toBottom } from '../helpers/scrollHelpers.jsx';

const NavigationBar = ({ landing, dispatch }) => (
  <div>
    <Navbar className="greennav">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#" className="logo">Bolster</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav bsStyle="pills" className="quicksand">
        {
          landing ?
            <div>
              <NavItem onSelect={function () { dispatch(renderForm(this.children)); toBottom(); }}>Signin</NavItem>
              <NavItem onSelect={function () { dispatch(renderForm(this.children)); toBottom(); }}>Signup</NavItem>
            </div>
          : <NavItem onSelect={function () { dispatch(signout()); }}>Signout</NavItem>
        }
      </Nav>
    </Navbar>
  </div>
);

export default connect(null)(NavigationBar);
