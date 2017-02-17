import React from 'react';
import { connect } from 'react-redux';
import { createGoal, fetchGoals } from '../actions/goalActions.js';

const CreateGoal = (props) => {
  let goalName = null;
  let goalAmount = null;
  let goalTimeframe = null;

  const submitHandler = (e) => {
    e.preventDefault();
    props.dispatch(createGoal({
      user_id: props.user_id,
      name: goalName.value,
      amount: goalAmount.value,
      date: goalTimeframe.value,
    }));
  };

  const goalHandler = (e) => {
    e.preventDefault();
    props.dispatch(fetchGoals({
      user_id: props.user_id,
    }));
  };

  return (
    <form action="#" onSubmit={submitHandler} className="centertext quicksand">
      <h3>Create A Goal</h3>
      <input type="text" className="inputsize inputmargin" placeholder="Name your budget" ref={(ref) => { goalName = ref; }} />
      <input type="number" className="inputsize inputmargin" placeholder="Enter amount" ref={(ref) => { goalAmount = ref; }} />
      <input type="date" className="inputsize inputmargin" ref={(ref) => { goalTimeframe = ref; }} />
      <button type="submit" className="btn btn-success submitbutton green">Submit</button>
    </form>
  );
};

export default connect(state => ({
  user_id: state.user.id,
  // goals: state.goals,
}))(CreateGoal);
