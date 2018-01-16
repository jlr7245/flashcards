
export function flashcardsHasErrored(bool) {
  return {
    type: 'FLASHCARDS_HAS_ERRORED',
    hasErrored: bool,
  };
};

export function flashcardsIsLoading(bool) {
  return {
    type: 'FLASHCARDS_IS_LOADING',
    isLoading: bool,
  };
};

export function flashcardsFetchDataSuccess(flashcards) {
  return {
    type: 'FLASHCARDS_FETCH_DATA_SUCCESS',
    flashcards,
  };
};

export function flashcardsFetchData(url) {
  return (dispatch) => {
    dispatch(flashcardsIsLoading(true));
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        dispatch(flashcardsIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(response =>  dispatch(flashcardsFetchDataSuccess(response.data.flashcards)))
      .catch(() => dispatch(flashcardsHasErrored(true)));
  }
}

