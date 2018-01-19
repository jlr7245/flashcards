import { isLoading } from './is-loading';

export const getFlashcardKeywords = id => {
  return dispatch => {
    fetch(`/api/flashcards/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(setCurrentKeywords(res.data.keywords));
      })
      .catch(err => console.log(err));
  };
};

export const setCurrentKeywords = keywords => ({
  type: 'SET_CURRENT_KEYWORDS',
  keywords,
});

export const setAllKeywords = keywords => ({
  type: 'SET_ALL_KEYWORDS',
  keywords,
});
