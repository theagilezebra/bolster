export default function (nextState, replace) {
  if (!window.localStorage.getItem('userToken')) {
    replace('/');
  }
}
