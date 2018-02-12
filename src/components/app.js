import styles from './global.css'
import Header from './header'
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from "./home";

const App = () => {
    return (
        <div>
            <Header/>
            <Router>
                <Route path="/" component={Home}/>
            </Router>
        </div>
    )
};

export default App;
