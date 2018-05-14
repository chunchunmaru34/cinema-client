import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import 'normalize.css';

import history from '../utils/history/index';
import Home from './home';
import UserIsAuthenticated from './auth/auth-hoc/user-is-authenticated';
import LoginPage from './auth/login-page/login-page-container';
import Header from './header/header-container';
import Footer from './footer';
import MovieDetails from './movie/movie-details/movie-details-container';
import SignUpPage from './auth/signup-page/signup-page-container';
import UserProfile from './user-profile/user-profile';
import NoMatch from './util-components/no-match/no-match';
import {
  LOGIN_ROUTE,
  MOVIES_ROUTE,
  HOME_ROUTE,
  SIGN_UP_ROUTE,
  USERS_ROUTE,
} from '../constants/routes';

import '../css/.global.scss';
import styles from './app.scss';

const App = () => (
  <Router history={history}>
    <div className={styles.app}>
      <Header/>
        <main className={`${styles.container} container`}>
          <Switch>
            <Route
              exact path={HOME_ROUTE}
              key={HOME_ROUTE}
              component={Home}/>
            <Route
              path={LOGIN_ROUTE}
              key={LOGIN_ROUTE}
              component={LoginPage}
            />
            <Route
              path={SIGN_UP_ROUTE}
              key={SIGN_UP_ROUTE}
              component={SignUpPage}
            />
            <Route
              path={`${USERS_ROUTE}/:id`}
              key={USERS_ROUTE}
              component={UserProfile}
            />
            <Route
              path={`${MOVIES_ROUTE}/:id`}
              key={MOVIES_ROUTE}
              component={UserIsAuthenticated(MovieDetails)}
            />
            <Route component={NoMatch}/>
          </Switch>
        </main>
     <Footer/>
    </div>
  </Router>
);

export default App;
