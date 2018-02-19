import './global.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import Home from "./home";
import Header from './header'
import MovieDetail from './movie-detail-container';

const App = () => {
    return (
        <Router>
             <div>
                <Header/>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/movies/:id" component={MovieDetail}/>
                </div>
            </div>
        </Router>
    )
};

export default App;
