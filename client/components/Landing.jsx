import React from 'react';
import { connect } from 'react-redux';
import JumbotronOne from './JumbotronOne.jsx';
import JumbotronTwo from './JumbotronTwo.jsx';
import JumbotronThree from './JumbotronThree.jsx';
import NavigationBar from './NavBar.jsx';
import css from '../styles/main.css';

class Landing extends React.Component {

  render() {
    return (
      <div>
        <NavigationBar landing />
        <JumbotronOne data={this.props.data} />
        <JumbotronTwo data={this.props.data} />
        <JumbotronThree formType={this.props.signForm} />
      </div>
    );
  }
}

export default connect(state => ({
  signForm: state.render.signForm,
}))(Landing);
