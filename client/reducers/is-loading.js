const isLoading = (state = true, action) => {
  switch(action.type) {
    case 'LOADING':
      return action.value;
    case 'SET_FLASHCARDS':
    case 'SET_USER':
    case 'SET_QUIZZES':
    case 'SET_KEYWORDS':
      return false;
    default:
      return state;
  }
}

export default isLoading;
