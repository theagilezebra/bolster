import React from 'react';
import { Jumbotron }  from 'react-bootstrap';
import TransactionChart from './TransactionChart.jsx';
const JumbotronTwo = props => ( // top third of the landing page
  <div>
    <Jumbotron>
      <h1>Bonjour, je suis Jumbotron 1</h1>
      <TransactionChart data= {props.data} /> 
    </Jumbotron>
  </div>
);

export default JumbotronTwo;
