import React from 'react';
import CreateGoal from './CreateGoal.jsx';
import BudgetGraph from './BudgetGraph.jsx';

const Goals = props => (
  <div>
    <CreateGoal dispatch={props.dispatch} />
  </div>
);

export default Goals;
