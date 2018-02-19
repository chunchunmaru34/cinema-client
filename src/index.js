import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/app';

const render = Component =>
  ReactDOM.render(
        <AppContainer>
            <Component/>
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
