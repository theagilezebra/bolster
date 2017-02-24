import React from 'react';
import { connect } from 'react-redux';
import Game from './Game.jsx';
import NavigationBar from './NavBar.jsx';
import { getPurchases, progressBar, average, previousMonth } from '../helpers/gameHelpers.jsx';
const Achievements = props => (
  <div>
    <NavigationBar />
    <div className="container-fluid">
      <div className="row">
        <Game name="Daily Challenge" start="2015-10-20" days={`${1}`} period="daily" />
        <Game name="Weekly Challenge" start="2015-10-20" days={`${7}`} period="weekly" />
      </div>
    </div>
  </div>
  );

export default connect(state => ({
  transactions: state.transactions.transactionsData,
}))(Achievements);

