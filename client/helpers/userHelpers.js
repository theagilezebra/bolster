export default function decorateState(newState, payload) {
  const { firstName, lastName, id, email } = payload;
  newState.sessionActive = true;
  newState.firstName = firstName;
  newState.lastName = lastName;
  newState.email = email;
  newState.id = id;
  return newState;
}
