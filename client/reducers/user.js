const user = (state = {}, action) => {
  const { type, user } = action;
  switch(type) {
    case 'SET_USER':
      return user;
    default:
      return state;
  }
}

export default user;