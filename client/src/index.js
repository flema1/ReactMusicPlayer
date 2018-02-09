import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './redux/reducer';

import { Provider } from 'react-redux';  
import { createStore , applyMiddleware } from 'redux'
import { apiMiddleware } from './redux/apiMiddleware';
import {createLogger} from 'redux-logger';

const store = createStore(reducer, applyMiddleware(apiMiddleware, createLogger({collapsed: true})));





ReactDOM.render(  
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);