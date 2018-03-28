import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
