import React from 'react';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { useDispatch, useSelector } from 'react-redux';
import * as action from "./redux/actions/auth";

const clientId = "769884231431-of9isdpkepiu948tv5n2b5isgqjsa875.apps.googleusercontent.com";

const  Auth = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({auth}) => auth.isLoggedIn);

  //Google account login Success
  const loginSuccess = (res) => {
    localStorage.setItem("token", JSON.stringify(res.tokenObj));
    dispatch(action.loginSuccess(res.tokenObj));
    alert("User authenticate sucessfully");
  };

  //Google account login Failure
  const loginFailure = (res) => {
      alert("Something went wrong");
      console.log("Login failed. res: ", res);
  };

  //Google account logout Success
  const logoutSuccess = () => {
    dispatch(action.logoutUser());
  };
  
  //Google account logout Failure
  const logoutFailure = () => {
      console.log("Logout failure!");
  };

  return (
    <div style={{float: 'right', padding: '11px'}}>
      {
          isLoggedIn === false ? (
          <LoginButton  loginSuccess={loginSuccess} loginFailure={loginFailure} clientId={clientId} />
        ):(
          <LogoutButton logoutSuccess={logoutSuccess} logoutFailure={logoutFailure} clientId={clientId} />
        )
      }
    </div>
  );
};

export default Auth;
