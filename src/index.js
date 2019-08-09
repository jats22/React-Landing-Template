import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).then(function (register) {
//     console.log("worked", register);
// }).catch(function (err) {
//     console.log("error!",err)
// });

