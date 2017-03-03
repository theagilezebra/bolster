import React from 'react';
import { connect, hashHistory } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import css from '../styles/main.css';
import renderForm from '../actions/renderActions';
import { signout } from '../actions/userActions';
import { toBottom } from '../helpers/scrollHelpers.jsx';

const NavigationBar = ({ landing, dispatch }) => (
  <div>
    <nav className="navbar navbar-inverse greennav">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand logo" href={landing ? '#' : '#/dashboard'}>Bolster</a>
        </div>
        <div className="dropdown navbar-right">
          <button className="hamburger btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span className="glyphicon glyphicon-align-justify" /></button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <ul className="nav navbar-nav navbar-right">
              {
                landing ?
                  <div className="nav navbar-nav">
                    <li id="Signin" onClick={function () { dispatch(renderForm(document.getElementById('Signin').innerText)); toBottom(); }}>Signin</li>
                    <li id="Signup" onClick={function () { dispatch(renderForm(document.getElementById('Signup').innerTextx)); toBottom(); }}>Signup</li>
                  </div>
                : <div className="nav navbar-nav">
                  <li onClick={function () { dispatch(signout()); }}>Signout</li>
                </div>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export default connect(null)(NavigationBar);

