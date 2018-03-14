const flashcards = (state = { flashcards: [], currentCard: {} }, action) => {
  switch(action.type) {
    case 'SET_FLASHCARDS':
      return action.flashcards;
    default:
      return state;
  }
}

export default flashcards;
