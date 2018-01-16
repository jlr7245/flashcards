import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import FlashcardList from './components/FlashcardList';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <FlashcardList />
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
