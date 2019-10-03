import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.module.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import miscReducer from './store/reducers/misc';
import authReducer from './store/reducers/auth'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import * as actions from './store/actions/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const rootReducer = combineReducers({
  misc: miscReducer,
  auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
if(localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const decoded = jwt_decode(localStorage.jwt);
  store.dispatch(actions.setUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(actions.logOut());
  }
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();