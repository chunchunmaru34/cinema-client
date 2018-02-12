import React from 'react';
import Movie from '../movie';

import styles from './styles.css';

const PATH = 'http://localhost:3003/movies';

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        };
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    fetchMovies() {
        fetch(PATH)
            .then((res) => res.json())
            .then((movies) => this.setState({ movies: movies }));
    }

    componentDidMount() {
        this.fetchMovies();
    }

    render() {
        let movies;
        if (this.state.movies.length) {
            movies = this.state.movies.map((movie) => {
                return <Movie data={movie} key={movie._id}/>
            });
        } else movies = "";

        return(
            <div className={styles.container}>
                {movies}
            </div>
        )
    }

}