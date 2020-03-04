import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
import './index.scss';
import App from './App';
import TmdbConfigContext, { defaultConfig } from './config/TmdbConfigContext';
// import * as serviceWorker from './serviceWorker';
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <TmdbConfigContext.Provider value={defaultConfig}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </TmdbConfigContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
