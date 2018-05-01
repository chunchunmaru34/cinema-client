import React from 'react';
import { connect } from 'react-redux';
import { searchMovieSessionsForCinema } from '../../actions';
import SearchBar from './search-bar';

class SearchBarContainer extends React.Component {
  onSearch = (criteria) => {
    const { dispatch, movieId, cinemaId } = this.props;
    dispatch(searchMovieSessionsForCinema({ movieId, cinemaId }, criteria));
  };

  render() {
    return <SearchBar search={this.onSearch}/>;
  }
}

const mapStateToProps = state => ({
  movieId: state.selectedMovie.movieDetails.data.id,
  cinemaId: state.selectedMovie.movieSessions.selectedCinema.id,
});

export default connect(mapStateToProps)(SearchBarContainer);
