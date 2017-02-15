import React from 'react';
import { connect } from 'react-redux';
import { createGoal } from '../actions/goalActions.js';

export default function CreateGoal({ dispatch }) {

const CreateGoal = ({ dispatch }) => {
  let goalName = null;
  let goalAmount = null;
  let goalTimeframe = null;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createGoal({
      goalName: goalName.value,
      goalAmount: goalAmount.value,
      goalTimeframe: goalTimeframe.value,
    }));
  };

  return (
    <form action="#" onSubmit={submitHandler} className="centertext">
      <h3>Create A Goal</h3>
      <input className="inputsize inputmargin" placeholder="Name your budget" ref={(ref) => { goalName = ref; }} />
      <input className="inputsize inputmargin" placeholder="Enter amount" ref={(ref) => { goalAmount = ref; }} />
      <input className="inputsize inputmargin" placeholder="Enter timeframe" ref={(ref) => { goalTimeframe = ref; }} />
      <button type="submit" className="btn btn-success submitbutton">Submit</button>
    </form>
  );
};

export default connect(null)(CreateGoal);
