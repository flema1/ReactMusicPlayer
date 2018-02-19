// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_ERROR,
//   SET_LOGIN_PENDING
// } from '../actions/constants/user.constants'

const INITIAL_STATE = { isLoginSuccess: false, isLoginPending: false, loginError: null /*, authToken:localStorage.getItem('API_TOKEN')*/};

export default (auth = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_LOGIN_PENDING':
      return Object.assign({}, auth, {
        isLoginPending: action.isLoginPending
      });

    case 'LOGIN_SUCCESS':
      //localStorage.setItem('API_TOKEN', action.payload);
      //window.location = "/home";
              
        
//sessionStorage.setItem('API_MUSIC_TOKEN', action.payloads);
      return Object.assign({}, auth, {
        isLoginSuccess: action.payload //action.isLoginSuccess
      });

    case 'LOGIN_ERROR':
      return Object.assign({}, auth, {
        loginError: action.loginError
      });
        //localStorage.removeItem('API_TOKEN');
    case 'LOGOUT':
    //alert('logout')
      return Object.assign({}, auth, {
        isLoginSuccess: false
      });
    default:
      return auth;
  }
}
