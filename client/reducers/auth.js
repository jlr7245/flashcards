const auth = (state = {}, action) => {
  switch(action.type) {
    case 'SET_AUTH':
      return action.auth;
    default:
      return state;
  }
}

export default auth;
