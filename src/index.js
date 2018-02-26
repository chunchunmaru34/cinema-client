import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import rootReducer from './components/root-reducer';

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
  module.hot.accept('./components/app', () => {
    require('./components/app');
    render(App);
  });
}
