import React from 'react';
import { Jumbotron }  from 'react-bootstrap';
import BudgetGraph from './BudgetGraph.jsx';
const JumbotronOne = props => ( 
  <div>
    <Jumbotron>
      <h1>Bonjour, je suis Jumbotron 1</h1>
      <BudgetGraph  data= {props.data} /> 
    </Jumbotron>
  </div>
);

export default JumbotronOne;
