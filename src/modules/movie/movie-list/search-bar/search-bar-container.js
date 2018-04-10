import React from 'react';
import { connect } from 'react-redux';
import { searchMovies } from '../actions';
import SearchBar from './search-bar';

class SearchBarContainer extends React.Component {
  onSearch = (criteria) => {
    const { dispatch } = this.props;
    dispatch(searchMovies(criteria));
  };

  render() {
    return <SearchBar search={this.onSearch}/>;
  }
}


export default connect()(SearchBarContainer);
