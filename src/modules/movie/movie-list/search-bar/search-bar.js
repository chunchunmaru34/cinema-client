import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import styles from './styles.scss';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: '' };
    this.searchDebounce = debounce(criteria => this.props.search(criteria), 250);
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value });
    this.searchDebounce(e.target.value);
  };

  render() {
    return (
      <div className={styles.container}>
        <input
          className="form-control"
          placeholder="Search: Movie title"
          value={this.state.searchInput}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func,
};
