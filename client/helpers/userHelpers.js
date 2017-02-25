export default function decorateState(newState, payload) {
  const { firstName, lastName, id, email, address, city, state, zip, country } = payload;
  newState.sessionActive = true;
  newState.firstName = firstName;
  newState.lastName = lastName;
  newState.address = address;
  newState.country = country;
  newState.email = email;
  newState.state = state;
  newState.city = city;
  newState.zip = zip;
  newState.id = id;
  return newState;
}
