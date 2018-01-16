export const flashcardsHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'FLASHCARDS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
};

export const flashcardsIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'FLASHCARDS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
};

export const flashcards = (state = [], action) => {
  switch (action.type) {
    case 'FLASHCARDS_FETCH_DATA_SUCCESS':
      return action.flashcards;
    default:
      return state;
  }
};
