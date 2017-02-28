import React from 'react';
import { connect } from 'react-redux';
import Game from './Game.jsx';
import NavigationBar from './NavBar.jsx';
import Stats from './Stats.jsx';
import { getPurchases, progressBar, average, previousMonth } from '../helpers/gameHelpers';

const Achievements = props => (
  <div>
    <NavigationBar />
    <div className="container quicksand">
      <div className="row">
        <Game name="Trappist Monk" start="2017-01-29" days={`${1}`} period="daily" />
        <Game name="Daily Hero" start="2015-10-20" days={`${7}`} period="daily" />
        <Game name="Weekly Hero" start="2015-10-20" days={`${7}`} period="weekly" />
      </div>
    </div>
    <div >
      <h1 className="quicksand centertext" >Past Achievements</h1>
      <Stats />
    </div>
  </div>
  );

export default connect(state => ({
  transactions: state.transactions.transactionsData,
}))(Achievements);

