const user = (state = {}, action) => {
  const { type, user } = action;
  switch(type) {
    case 'SET_USER':
      return user;
    case 'SET_USER_FLASHCARDS':
      return {
        ...state,
        flashcards: user.flashcards,
      }
    case 'CLEAR_USER':
      return {};
    default:
      return state;
  }
}

export default user;
