import React from 'react';
import ReactDOM from 'react-dom';
 
import App from './App';

const title = 'HMS';
 
ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
