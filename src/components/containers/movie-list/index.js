import React from 'react';
import MovieList from '../../presentations/movie-list'
import { connect } from 'react-redux';
import { fetchMovies } from '../../../actions'

class MovieListContainer extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchMovies());
    }

    render() {
        return React.createElement(MovieList, { movies: this.props.movies });
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies.data
    }
};

export default connect(mapStateToProps)(MovieListContainer);

