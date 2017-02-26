import { hero, getOneDayTotal } from '../client/helpers/gameHelpers.jsx';

const achievementFunctions = {

  'Trappist Monk': function (purchases) {
    return getOneDayTotal(new Date(), 1, purchases);
  },

  'Daily Hero': function (purchases) {
    return hero(new Date(), 1, 'daily', purchases);
  },

  'Weekly Hero': function (purchases) {
    return hero(new Date(), 7, 'weekly', purchases);
  },
};

