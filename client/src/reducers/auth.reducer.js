import * as types from '../constants/auth.constants';

const INITIAL_STATE = { isLoginSuccess: false, isLoginPending: false, loginError: null };

export default (auth = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOGIN_PENDING:
      return Object.assign({}, auth, {
        isLoginPending: action.isLoginPending
      });

    case types.LOGIN_SUCCESS:
      return Object.assign({}, auth, {
        isLoginSuccess: action.payload 
      });

    case types.LOGIN_ERROR:
      return Object.assign({}, auth, {
        loginError: action.loginError
      });
  
    case types.LOGOUT:
      return Object.assign({}, auth, {
        isLoginSuccess: false
      });
    default:
      return auth;
  }
}
