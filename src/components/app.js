import './global.css';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';

import Home from "./presentations/home";
import Header from './presentations/header'
import MovieDetail from './containers/movie-details';
import Footer from './presentations/footer'

const App = () => {
    return (
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
    )
};

export default App;
