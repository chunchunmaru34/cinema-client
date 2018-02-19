import { connect } from 'react-redux';
import React from 'react';
import MovieDetail from './movie-details';
import { fetchMovieDetails } from '../../../actions/index';

class MovieDetailContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovieDetails(this.props.id));
  }

  render() {
    return React.createElement(MovieDetail, { movie: this.props.movieDetails });
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  movieDetails: state.movieDetails.data,
});

export default connect(mapStateToProps)(MovieDetailContainer);
