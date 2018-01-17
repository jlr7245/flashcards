import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flashcards from './flashcards';
import isLoading from './is-loading';

export default combineReducers({
  routing: routerReducer,
  flashcards,
  isLoading,
});
