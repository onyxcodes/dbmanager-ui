import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './views/App';
import './index.css';
import { HashRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <div id="app">
		<Router>
      <App />
      </Router></div>
    </Provider>
  </React.StrictMode>, document.getElementById('root')
);
