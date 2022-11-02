import React, { useEffect } from 'react';
import './Components/style.css';
import { gapi } from 'gapi-script';

import Main from './Components/Main';
import Auth from './Components/Auth';

const clientId = "386932037035-k8v833noqjk7m4auae0t83vnkrqvvg3t.apps.googleusercontent.com";

const  App = () => {
                  
  useEffect(() => {
    
    const start = () => {
        gapi.client.init({
            clientId : clientId,
            scope    : ""
        });
    };

    gapi.load('client:auth2', start);
  });

  //var accessToken = gapi.auth.getToken().access_token;

  return (
    <div className='App'>
        <Auth />
        <Main />
    </div>
  );
}

export default App;
