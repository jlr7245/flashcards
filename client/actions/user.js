import { isLoading } from './is-loading';

export const fetchUserProfile = () => {
  return dispatch => {
    dispatch(isLoading(true));
    fetch('/api/user', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        dispatch(setUserFlashcards(res.data.flashcards));
        dispatch(isLoading(false));
      })
      .catch(err => console.log(err));
  }
}

export const setUserFlashcards = flashcards => ({
  type: 'SET_USER_FLASHCARDS',
  user: {
    flashcards,
  }
});

export const setUser = user => ({
  type: 'SET_USER',
  user,
});
