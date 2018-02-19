import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';

import './global.css';
import Home from './home';
import Header from './header';
import MovieDetail from './movie/movie-details/movie-details-container';
import Footer from './footer';

const App = () => (
        <Router>
             <div>
                <Header/>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/movies/:id" component={MovieDetail}/>
                </div>
                 <Footer/>
            </div>
        </Router>
);

export default App;
