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
import MovieDetail from './movie/movie-detail/movie-detail-container';

const App = () => (
        <Router>
             <div>
                <Header/>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/movies/:id" component={MovieDetail}/>
                </div>
            </div>
        </Router>
);

export default App;
