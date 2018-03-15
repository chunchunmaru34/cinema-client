import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCinemasForMovie } from '../actions';
import CinemaList from './cinema-list';

class CinemaListContainer extends React.Component {
  componentDidMount() {
    const { dispatch, movieId } = this.props;
    dispatch(fetchCinemasForMovie(movieId));
  }
  render() {
    const component = <CinemaList cinemas={this.props.cinemas}/>;
    const loadingMessage = 'Loading';
    return this.props.cinemas ? component : loadingMessage;
  }
}

const mapStateToProps = state => ({
  cinemas: state.selectedMovie.movieSessions.cinemas,
  movieId: state.selectedMovie.movieDetails.data.id,
});

CinemaListContainer.propTypes = {
  cinemas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rooms: PropTypes.array,
    roomsCount: PropTypes.number,
  })),
  movie: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(CinemaListContainer));
