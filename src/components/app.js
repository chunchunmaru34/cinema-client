import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './global.scss';
import Home from './home';
import Header from './header';
import MovieDetails from './movie/movie-details/movie-details-container';

const App = () => (
        <Router>
             <div>
                <Header/>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/movies/:id" component={MovieDetails}/>
                </div>
            </div>
        </Router>
);

export default App;
