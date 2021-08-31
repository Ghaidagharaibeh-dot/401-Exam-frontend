import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-8h3gncm4.us.auth0.com"
    clientId="YNJg4o6RS3r2Z1RzA1cZS7CxqjmEtL2K"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// // TODO: wrap everything in Auth0
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
