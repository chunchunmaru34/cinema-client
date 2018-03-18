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
import SignUpPage from './auth/signup-page/signup-page-container';
import UserProfile from './user-profile/user-profile-container';

import styles from '../css/.global.scss';

const App = () => (
  <Router history={history}>
    <div>
      <Header/>
        <div className={styles.container}>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignUpPage}/>
          <Route path="/user/:id" component={UserProfile}/>
          <Route path="/movies/:id"
                 component={UserIsAuthenticated(MovieDetails)}/>
        </div>
     <Footer/>
    </div>
  </Router>
);

export default App;
