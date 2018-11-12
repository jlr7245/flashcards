import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index';

export const history = createHistory();

const initialState = {
  offset: { offset: 0 },
  flashcards: [],
  isLoading: true,
  auth: false,
  user: {},
  keywords: {
    allKeywords: [],
    currentKeywords: [],
  }
};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  logger,
];

if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;


