import React from 'react';
import { connect } from 'react-redux';
// actions and other components

import css from '../styles/main.css';

class App extends React.Component {
  render() {
    return (
      <div>This is our website!!</div>
    );
  }
}

export default connect(state => ({

}))(App);
