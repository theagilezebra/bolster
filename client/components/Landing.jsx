import React from 'react';
import { connect } from 'react-redux';

import JumbotronOne from './JumbotronOne.jsx';
import JumbotronTwo from './JumbotronTwo.jsx';
import JumbotronThree from './JumbotronThree.jsx';
import NavigationBar from './NavBar.jsx';
import css from '../styles/main.css';
const Landing = props => (
  <div>
    <NavigationBar />
    <JumbotronOne data={props.data}/>
    <JumbotronTwo data={props.data}/>
    <JumbotronThree />
  </div>
);

export default connect(state => ({
  // some stuff to connect a session to this user
  // accept user's input to create a session
}))(Landing);
