import React from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import 'normalize.css';
import history from '../utils/history/index';
import Home from './home';
import UserIsAuthenticated from './auth/auth-hoc/user-is-authenticated';
import LoginPage from './auth/login-page/login-page-container';
import Header from './header/header-container';
import Footer from './footer';
import MovieDetails from './movie/movie-details/movie-details-container';
import {
  LOGIN_ROUTE,
  MOVIES_ROUTE,
  HOME_ROUTE,
} from '../constants/routes';

import styles from '../css/.global.scss';

const App = () => (
  <Router history={history}>
    <div>
      <Header/>
        <div className={styles.container}>
          <Route exact path={HOME_ROUTE} component={Home}/>
          <Route path={LOGIN_ROUTE} component={LoginPage}/>
          <Route path={`${MOVIES_ROUTE}/:id`}
                 component={UserIsAuthenticated(MovieDetails)}/>
        </div>
     <Footer/>
    </div>
  </Router>
);

export default App;
