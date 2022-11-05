import React, { useEffect } from 'react';
import './Components/style.css';
import { gapi } from 'gapi-script';

import Main from './Components/Main';
import Auth from './Components/Auth';

const clientId = "769884231431-of9isdpkepiu948tv5n2b5isgqjsa875.apps.googleusercontent.com";

const  App = () => {
                  
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
          clientId: clientId,
          apiKey:"AIzaSyB2x2HAHztoKFF5yikA68k0xAnJqThejTU",
          scope: "https://www.googleapis.com/auth/books"
      });
    };
    gapi.load("client:auth2", initClient);
    console.log(gapi);
  });
  
  return (
    <div className='App'>
        <Auth />
        <Main />
    </div>
  );
}

export default App;
