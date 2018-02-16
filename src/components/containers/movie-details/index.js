import React from 'react';
import MovieDetail from '../../presentations/movie-details/index';
import { fetchMovieDetails } from "../../../actions";
import { connect } from 'react-redux';

class MovieDetailContainer extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchMovieDetails(this.props.id))
    }

    render() {
        return React.createElement(MovieDetail, { movie: this.props.movieDetails })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        movieDetails: state.movieDetails.data
    }
} ;

export default connect(mapStateToProps)(MovieDetailContainer)