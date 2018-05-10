import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchCinemasForMovie, clearState } from '../actions';
import CinemaList from './cinema-list';

class CinemaListContainer extends React.Component {
  componentDidMount() {
    const { dispatch, movieId } = this.props;
    dispatch(fetchCinemasForMovie(movieId));
  }

  componentWillUnmount() {
    this.props.dispatch(clearState());
  }

  render() {
    const { cinemas, isLoading } = this.props;
    return (
      <CinemaList
        cinemas={cinemas}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  cinemas: state.selectedMovie.movieSessions.cinemas,
  movieId: state.selectedMovie.movieDetails.data.id,
  isLoading: state.selectedMovie.movieSessions.isCinemasLoading,
});

CinemaListContainer.propTypes = {
  cinemas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rooms: PropTypes.array,
    roomsCount: PropTypes.number,
  })),
};

export default withRouter(connect(mapStateToProps)(CinemaListContainer));
