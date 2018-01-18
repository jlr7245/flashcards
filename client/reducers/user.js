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
    default:
      return state;
  }
}

export default user;
