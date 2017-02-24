import React from 'react';
import { connect } from 'react-redux';
import { progressBar } from '../helpers/gameHelpers.jsx';
const Game = props => (
  <div>
    <div className="col-md-4 green">
      <div> { props.name }</div>
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progressBar(props.start, props.days, props.period, props.transactions)}%` }} /> 
      </div>
    </div>
  </div>
);

export default connect(state => ({
  transactions: state.transactions.transactionsData,
}))(Game);
