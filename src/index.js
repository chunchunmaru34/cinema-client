import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers';
import { fetchMovies, fetchCinemas, fetchMovieDetails } from './actions'

let store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
    );

const render = (Component) =>
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    );

render(App);
if (module.hot) {
    module.hot.accept('./components/app', () => {
        require('./components/app');
        render(App);
    })
}

// store.dispatch(fetchMovies())
//     .then(() => console.log(store.getState()));
// store.dispatch(fetchCinemas())
//     .then(() => console.log(store.getState()));
// store.dispatch(fetchMovieDetails("5a7b03652642df33c81081d6"))
//     .then(() => console.log(store.getState()));