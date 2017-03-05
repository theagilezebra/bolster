import React from 'react';
import { connect } from 'react-redux';
import Game from './Game.jsx';
import NavigationBar from './NavBar.jsx';
import { displayAchievements } from '../helpers/achievementHelpers';

const Achievements = ({ achievements }) => (
  <div>
    <NavigationBar />
    <div className="container quicksand">
      <div className="row">
        {console.log(achievements)}
        {displayAchievements(achievements)}
      </div>
    </div>
  </div>
  );

export default connect(state => ({
  achievements: state.achievements.achievementsData,
}))(Achievements);

