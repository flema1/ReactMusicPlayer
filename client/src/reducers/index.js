import { combineReducers } from 'redux';
import main from './main.reducer';
import auth from './auth.reducer';

export default combineReducers({
  //...reducers
  auth,
  main
});
