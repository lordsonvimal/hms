import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
 
import App from 'src/App';

const title = 'HMS';
 
ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
