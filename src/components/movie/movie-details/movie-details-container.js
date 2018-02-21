import { connect } from 'react-redux';
import React from 'react';
import MovieDetails from './movie-details';
import { fetchMovieDetails } from '../../../actions/index';

class MovieDetailsContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovieDetails(this.props.id));
  }

  render() {
    return this.props.movieDetails ?
        <MovieDetails movie={this.props.movieDetails}
                      match={this.props.match}/>
      : '';
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  match: ownProps.match,
  movieDetails: state.movieDetails.data,
});

export default connect(mapStateToProps)(MovieDetailsContainer);
