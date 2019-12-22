import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Player from './components/common/player';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Player />, document.getElementById('root'));
// registerServiceWorker();

// navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).then(function (register) {
//     console.log("worked", register);
// }).catch(function (err) {
//     console.log("error!",err)
// });

