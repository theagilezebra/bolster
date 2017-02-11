import React from 'react';
import AddBank from './AddBank.jsx';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <div>Dashboard</div>
        <AddBank dispatch={this.props.dispatch} />
      </div>
    );
  }
}

export default Dashboard;
