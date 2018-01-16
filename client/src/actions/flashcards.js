import axios from 'axios';

export const flashcardsHasErrored = (bool) => {
  return {
    type: 'FLASHCARDS_HAS_ERRORED',
    hasErrored: bool,
  };
};

export const flashcardsIsLoading = (bool) => {
  return {
    type: 'FLASHCARDS_IS_LOADING',
    isLoading: bool,
  };
};

export const flashcardsFetchDataSuccess = (flashcards) => {
  return {
    type: 'FLASHCARDS_FETCH_DATA_SUCCESS',
    flashcards,
  };
};

export const flashcardsFetchData = (url) => {
  return (dispatch) => {
    dispatch(flashcardsIsLoading(true));
    axios.get(url)
      .then((res) => {
        if (res.statusText !== 'OK') {
          throw Error(res.statusText);
        }
        dispatch(flashcardsIsLoading(false));
        return dispatch(flashcardsFetchDataSuccess(res.data.data.flashcards));
      })
      .catch(() => dispatch(flashcardsHasErrored(true)));
  };
};

