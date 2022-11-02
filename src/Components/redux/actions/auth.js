// Action for When Data Fecth is Successful
export function loginSuccess(tokenObj) {
  return {
      type: 'LOGIN_SUCCESS',
      tokenObj,
    };
}

// Authenticated Action
export function authenticated(bool) {
    return {
      type: 'AUTHENTICATED',
      authenticated: bool,
    };
}
  
// Action to Logout User
export  function logoutUser() {
  localStorage.clear();
  return {
    type: 'LOGOUT',
  };
}