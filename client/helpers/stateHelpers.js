export const defaultState = {
  render: {
    signForm: 'Signup',
  },
  user: {
    sessionActive: null,
    id: null,
  },
  error: {
    signup: '',
    signin: '',
  },
  accounts: {
    accountData: [],
  },
  transactions: {
    transactionsData: [],
  },
};

export function resetState(state, stateProperty) {
  for (const key in state) {
    delete state[key];
  }
  Object.assign(state, defaultState[stateProperty]);
}

// modularizes retrieving user id retrieval inside of redux action files, facilitates state restructuring
export function getUserId(getState) {
  return getState().user.id;
}
