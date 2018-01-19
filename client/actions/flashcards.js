import { isLoading } from './is-loading';
import { setAllKeywords } from './keywords';

export const fetchAllFlashcards = () => {
  return dispatch => {
    dispatch(isLoading(true));
    fetch('/api/flashcards', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(isLoading(false));
        dispatch(setFlashcards(res.data.flashcards));
        dispatch(setAllKeywords(res.data.keywords));
      })
      .catch(err => console.log(err));
  };
};

export const setFlashcards = flashcards => ({
  type: 'SET_FLASHCARDS',
  flashcards,
});

export const findOneFlashcard = id => ({
  type: 'FIND_ONE_FLASHCARD',
  id,
});
