import React from 'react';
import Game from '../components/Game.jsx';

const displayAchievements = (achievements) => {
  const elements = [];
  achievements.forEach((achievement) => {
    elements.push(
      <Game
        name={achievement.name}
        percentage={achievement.structure === 'profile' ? achievement.status == null ? 0 : 1 : achievement.percentage === null ? 0 : achievement.percentage}
        structure={achievement.structure}
        status={achievement.status}
      />,
    );
  });
  return elements;
};

const achievementSubHeading = (achievement) => {
  if (achievement.status === true) {
    return <span>You completed this</span>;
  }
  if (achievement.structure === 'profile') {
    return <span>Fill out your profile to achieve this</span>;
  }
  if (achievement.total == null) {
    return <div><span>Spent: 0</span><span> Average: { achievement.average == null ? 0 : achievement.average}</span></div>;
  }
  return <div><span>Spent: {achievement.total}</span><span> Average: { achievement.average == null ? 0 : achievement.average}</span></div>;
};

module.exports = {
  displayAchievements,
  achievementSubHeading,
};

