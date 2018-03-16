import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import 'normalize.css';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import Home from './home';
import LoginPage from './auth/login-page/login-page';
import Header from './header/header-container';
import Footer from './footer';
import MovieDetails from './movie/movie-details/movie-details-container';

import styles from '../css/.global.scss';

const UserIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => state.auth.user,
  redirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated',
});

const App = () => (
  <Router>
    <div>
      <Header/>
        <div className={styles.container}>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/movies/:id" component={UserIsAuthenticated(MovieDetails)}/>
        </div>
     <Footer/>
    </div>
  </Router>
);

export default App;
