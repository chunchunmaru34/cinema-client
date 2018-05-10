import React from 'react';
import { connect } from 'react-redux';

import { searchCinemasForMovie } from '../../actions';
import SearchBar from './search-bar';

class SearchBarContainer extends React.Component {
  onSearch = (criteria) => {
    const { dispatch, movieId } = this.props;
    dispatch(searchCinemasForMovie(movieId, criteria));
  };

  render() {
    return <SearchBar search={this.onSearch}/>;
  }
}

const mapStateToProps = state => ({
  movieId: state.selectedMovie.movieDetails.data.id,
});

export default connect(mapStateToProps)(SearchBarContainer);
