import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { apiMiddleware } from './middlewares/apiMiddleware';
import { authMiddleware } from './middlewares/authMiddleware';
import App from './App';


const store = createStore(rootReducer, applyMiddleware(apiMiddleware, authMiddleware, createLogger({
  collapsed: true
})));


ReactDOM.render( <Provider store = { store } >
                    <App / >
                 </Provider>, document.getElementById('root')
);
