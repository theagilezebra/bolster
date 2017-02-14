import React from 'react';
import { createGoal } from '../actions/goalActions';

export default function CreateGoal({ dispatch }) {
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
    <form action="#" onSubmit={submitHandler}>
      <h3>Create A Goal</h3>
      <input className="inputsize" placeholder="Name your budget" ref={(ref) => { goalName = ref; }} />
      <input className="inputsize" placeholder="Enter amount" ref={(ref) => { goalAmount = ref; }} />
      <input className="inputsize" placeholder="Enter timeframe" ref={(ref) => { goalTimeframe = ref; }} />
      <button type="submit">Submit</button>
    </form>
  );
}
