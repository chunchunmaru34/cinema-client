import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import configureAxios from './utils/axios/axios-config';
import App from './modules/app';
import store from './redux/store';

configureAxios();

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
