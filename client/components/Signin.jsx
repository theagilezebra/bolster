import React from 'react';
import { connect } from 'react-redux';
import { signin } from '../actions/userActions';
import renderForm from '../actions/renderActions';
import { fetchAccounts } from '../actions/accountActions';
import { fetchTransactions, requestTransactions } from '../actions/transActions';
import { fetchGoals } from '../actions/goalActions';
import { fetchBudgets } from '../actions/budgetActions';
import { fetchCategories } from '../actions/categoryActions';
import { fetchAchievements } from '../actions/achievementActions';

const Signin = ({ dispatch, error }) => {
  let emailInput = null;
  let passwordInput = null;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin({
      email: emailInput.value,
      password: passwordInput.value,
    }))
    .then(() => {
      dispatch(fetchAccounts());
      dispatch(requestTransactions())
      .then(() => dispatch(fetchTransactions()));
      dispatch(fetchGoals());
      dispatch(fetchBudgets());
      dispatch(fetchCategories());
      dispatch(fetchAchievements());
    })
    .catch((err) => {
      console.error(`error fetching data: ${err}`);
    });
  };

  return (
    <form action="#" onSubmit={submitHandler} className="quicksand">
      <h3>Don&apos;t have an account? <a onClick={() => { dispatch(renderForm('Signup')); }}>Sign up</a> to get started!</h3>
      <div>
        <input
          required
          type="email"
          className="inputsize inputmargin"
          placeholder="Enter email"
          ref={(ref) => { emailInput = ref; }}
        />
      </div>
      <div>
        <input
          required
          type="password"
          className="inputsize inputmargin"
          placeholder="Enter super secret password"
          ref={(ref) => { passwordInput = ref; }}
        />
      </div>
      <p className="error-message">{error}</p>
      <button type="submit" className="btn btn-success submitbutton green">Signin</button>
    </form>
  );
};

export default connect(state => ({
  error: state.error.signin,
}), null)(Signin);
