import { combineReducers } from 'redux';
import { flashcards, flashcardsHasErrored, flashcardsIsLoading } from './flashcards';

export default combineReducers({
  flashcards,
  flashcardsHasErrored,
  flashcardsIsLoading,
});

