import React from 'react';
import CreateGoal from './CreateGoal.jsx';
import BudgetGraph from './BudgetGraph.jsx';

const Goals = props => ( // all transactions linked to a user
  <div>
    <CreateGoal /> {/* ONLY ALLOWING ONE GOAL FOR MVP */}
    <BudgetGraph />
  </div>
);

export default Goals;
