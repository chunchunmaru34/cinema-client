import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import 'normalize.css';
import styles from '../css/.global.scss';
import Home from './home';
import LoginPage from './auth/login-page/login-page';
import Header from './header';
import Footer from './footer';
import MovieDetails from './movie/movie-details/movie-details-container';

const App = () => (
  <Router>
       <div>
          <Header/>
          <div className={styles.container}>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={LoginPage}/>
              <Route path="/movies/:id" component={MovieDetails}/>
          </div>
         <Footer/>
      </div>
  </Router>
);

export default App;
