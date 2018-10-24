import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import flashcards from './flashcards';
import isLoading from './is-loading';
import auth from './auth';
import user from './user';
import offset from './offset'
import keywords from './keywords';

export default combineReducers({
  routing: routerReducer,
  flashcards,
  isLoading,
  user,
  auth,
  keywords,
  offset
});
