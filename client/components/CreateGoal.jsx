import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createGoal, renderGoal, deleteGoal } from '../actions/goalActions.js';
import { displayGoals, parseDate } from '../helpers/goalHelpers.jsx';

const CreateGoal = (props) => {
  let goalName = null;
  let goalAmount = null;
  let goalTimeframe = null;
  let goalID = null;

  const submitHandler = (e) => {
    e.preventDefault();
    props.dispatch(createGoal({
      name: goalName.value,
      amount: goalAmount.value,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: goalTimeframe.value,
    }));
    goalName.value = '';
    goalAmount.value = '';
    goalTimeframe.value = '';
  };

  const handleGoalSelect = (e) => {
    const { children } = e.nativeEvent.path[1];
    e.preventDefault();
    props.dispatch(renderGoal({
      name: children[0].innerText,
      amount: children[1].innerText,
      startDate: moment(parseDate(children[2].innerText), 'YYYY-MM-DD')._i,
      endDate: moment(parseDate(children[3].innerText), 'YYYY-MM-DD')._i,
    }));
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    goalID = Number(e.target.attributes['data-goal'].value);
    props.dispatch(deleteGoal({
      user_id: props.user_id,
      goal_id: goalID,
    }));
  };

  return (
    <div>
      <form action="#" onSubmit={submitHandler} className="centertext quicksand">
        <h3>Create A Goal</h3>
        <input type="text" className="goal-inputsize inputmargin" placeholder="Name your budget" ref={(ref) => { goalName = ref; }} />
        <input type="number" className="goal-inputsize inputmargin" placeholder="Enter amount" ref={(ref) => { goalAmount = ref; }} />
        <input
          type="date"
          className="goal-inputsize inputmargin"
          min={moment().format('YYYY-MM-DD')}
          max={moment().add(6, 'M').format('YYYY-MM-DD')}
          ref={(ref) => { goalTimeframe = ref; }}
        />
        <button type="submit" className="btn btn-success submitbutton green">Submit</button>
      </form>
      <div className="quicksand">
        <h3>Current Goals</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {displayGoals(props.goals, handleGoalSelect, deleteHandler)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default connect(state => ({
  goals: state.goals.goalsData,
  transactions: state.transactions.transactionsData,
}))(CreateGoal);
