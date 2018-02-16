import React from 'react';
import MovieList from '../../presentations/movie-list'
import { MOVIES_PATH } from '../../../../conf/api-paths'

export default class MovieListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        };
    }

    fetchMovies = () => {
        fetch(MOVIES_PATH)
            .then(res => res.json())
            .then(movies => this.setState({ movies: movies }));
    };

    componentDidMount() {
        this.fetchMovies();
    }

    render() {
        return React.createElement(MovieList, { movies: this.state.movies });
    }

}