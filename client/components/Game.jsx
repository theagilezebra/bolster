import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-progressbar.js';
import { progressBar } from '../helpers/gameHelpers.jsx';
const options = {
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  strokeWidth: 8,
  duration: 1000,
  easing: 'bounce',
};
const containerStyle = {
  width: '350px',
  height: '40px',
};
const Game = props => (
  <div>
    <div className="col-md-4">
      <div> { props.name }</div>
      <div className="progressbar">
        <Line progress={0.80} containerStyle={containerStyle} initialAnimate options={options} containerClassName={'.progressbar'} />
      </div>
    </div>
  </div>
);

export default connect(state => ({
  transactions: state.transactions.transactionsData,
}))(Game);

{ /* <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: `${progressBar(props.start, props.days, props.period, props.transactions)}%` }} />*/ }
