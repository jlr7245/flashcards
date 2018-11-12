import { isLoading } from './is-loading';
import { setAllKeywords } from './keywords';
import { incrementOffset } from './offset';

export const fetchFlashcardSet = () => {
  return (dispatch, getState) => {
    const { offset: { offset }, flashcards } = getState()
    console.warn(offset)
    if (offset > 0 && flashcards.length < offset) return
    dispatch(isLoading(true));
    fetch(`/api/flashcards?start=${offset}&count=12`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(isLoading(false));
        dispatch(setFlashcards(flashcards.concat(res.data.flashcards)));
        dispatch(setAllKeywords(res.data.keywords));
        dispatch(incrementOffset(offset))
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
