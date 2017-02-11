import React from 'react';
import { connect } from 'react-redux';
// actions and other components
import css from '../styles/main.css';
import TransactionChart from './TransactionChart.jsx';
import BudgetGraph from './BudgetGraph.jsx'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      //temporary 
      radardata: {
          labels: ["Utilities","Food And Drink","Healthcare", "Car Payment", "Mortgage"],
          datasets: [{
            data: [300, 180, 200, 125, 800],
            fillColor: "#2ECC71"
          }, 
          {
            data: [500, 100, 30, 100, 600],
            fillColor: "#EFD002",
            pointBackgroundColor: "#9B59B6"
          }]
      },
    linedata: {
      labels: ["Utilities","Food And Drink","Healthcare", "Car Payment", "Mortgage"],
      datasets: [{
        data: [300, 180, 200, 125, 800],
      }]
    }
  } 
}

  render() {
    return (
      <div>
        <div>This is our website!!</div>
        <TransactionChart data={this.state.radardata} />
        <BudgetGraph data= {this.state.linedata} />
      </div>
    );
  }
}

export default connect(state => ({

}))(App);
