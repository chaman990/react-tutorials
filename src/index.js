import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ToastrContainer from 'react-toastr-basic'



ReactDOM.render(
  <React.StrictMode>
  <ToastrContainer />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// toastr js basic link : - https://github.com/kimwandev/react-toastr-basic
