import React, { useState, useEffect } from 'react';
import LoginButton from './Login';
import LogoutButton from './Logout';

const clientId = "386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com";

const  App = () => {

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const tokenObj = localStorage.getItem("tokenObj") !=null 
                  ? JSON.parse(localStorage.getItem("tokenObj")) 
                  : null;
                  
  useEffect(() => {
    
    if(tokenObj == null){
        setisLoggedIn(false);
    }else{
        setisLoggedIn(true);
    }
  });

  //var accessToken = gapi.auth.getToken().access_token;

  //Google account login Success
  const loginSuccess = (res) => {
    
    var tokenObj = JSON.stringify(res.tokenObj);
    var profileObj = JSON.stringify(res.profileObj);

    localStorage.setItem("tokenObj", tokenObj);
    localStorage.setItem("profileObj", profileObj);
    
    setisLoggedIn(true);
    alert("User authenticate sucessfully");
    console.log("Login successful!", res.profileObj);

  }

  //Google account login Failure
  const loginFailure = (res) => {
      alert("Something went wrong");
      console.log("Login failed. res: ", res);
  }

  //Google account logout Success
  const logoutSuccess = () => {
    
      localStorage.removeItem("tokenObj");
      localStorage.removeItem("profileObj");
      setisLoggedIn(false);
      console.log("Logout successful!");
  };
  
  //Google account logout Failure
  const logoutFailure = () => {
      console.log("Logout failure!");
  };

  return (
    <div style={{float: 'right', padding: '11px'}}>
        {
        tokenObj == null ? 
        (
            <LoginButton  loginSuccess={loginSuccess} loginFailure={loginFailure} clientId={clientId} isLoggedIn={isLoggedIn} />
        ) 
        :
        (
            <LogoutButton logoutSuccess={logoutSuccess} logoutFailure={logoutFailure} clientId={clientId} isLoggedIn={isLoggedIn} />
        )
        }
    </div>
  );
}

export default App;
