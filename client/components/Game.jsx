import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-progressbar.js';
import { achievementSubHeading } from '../helpers/achievementHelpers.js';

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
      <div className="achievementDiv"> { props.name }</div>
      <div className="progressbar">
        <Line progress={props.percentage} containerStyle={containerStyle} initialAnimate options={options} containerClassName={'.progressbar'} />
      </div>
      {
        achievementSubHeading(props)
      }
    </div>
  </div>
);

export default connect(state => ({
  transactions: state.transactions.transactionsData,
}))(Game);
