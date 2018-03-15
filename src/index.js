import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/app';
import rootReducer from './modules/root-reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const render = Component =>
  ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Component/>
        </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );

render(App);
if (module.hot) {
  module.hot.accept('./modules/app', () => {
    require('./modules/app');
    render(App);
  });
}
