import * as types from '../constants/auth.constants';
import axios from 'axios';

function setLoginPending(isLoginPending) {
  return {
    type: types.SET_LOGIN_PENDING,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: isLoginSuccess
  };
}

function setLoginError(loginError) {
  return {
    type: types.LOGIN_ERROR,
    loginError
  }
}


// function logOut() {
//   return {
//      type: 'LOGOUT'
//   };
// }



// export const logOutUser=()=>dispatch=>{
//   sessionStorage.removeItem('API_TOKEN');
//   dispatch(logOut())
// }




export const authMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action)
  switch (action.type) {
    case types.LOGIN:
      axios.post(`/auth/signin`, {
          email: action.email,
          password: action.password
        })
        .then((res) => {
          console.log(res, 'fE, log in')
          //dispatch(setLoginSuccess(true));
          return next(setLoginSuccess(true))

        })
        .catch((err) => {
          //console.log(error, 'err, fE, regis')
          //console.log(err.response.data);
          //console.log(err.response.status);
          //dispatch(setLoginError(err.response.status));
        })
      break;

      // Do nothing if the action does not interest us
    default:
      break;
  }
};
