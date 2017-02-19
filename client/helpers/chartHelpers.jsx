import moment from 'moment';

const sortByDate = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();

const dateLabels = mappedObj => Object.keys(mappedObj).map(item => moment(item).format('MMMM Do YYYY'));


module.exports = {
  sortByDate,
  dateLabels,
};
