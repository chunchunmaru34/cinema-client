import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './global.scss';
import Home from './home';
import Header from './header';
import Footer from './footer';
import MovieDetails from './movie/movie-details/movie-details-container';

const App = () => (
  <Router>
       <div>
          <Header/>
          <div className={styles.container}>
              <Route exact path="/" component={Home}/>
              <Route path="/movies/:id" component={MovieDetails}/>
          </div>
         <Footer/>
      </div>
  </Router>
);

export default App;
