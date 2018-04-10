import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styles from './styles.scss';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        availableSeats: 0,
        date: null,
      },
    };
    this.searchDebounce = debounce(criteria => this.props.search(criteria), 250);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      criteria: {
        ...this.state.criteria,
        [name]: value,
      },
    });
    const criteria = {
      ...this.state.criteria,
      [name]: value,
    };
    this.searchDebounce(criteria);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className="input-group">
          <input
            className="form-control"
            type="date"
            placeholder="date"
            name="date"
            value={this.state.criteria.date}
            onChange={this.handleChange}
          />
          <input
            className="form-control text-right"
            type="number"
            placeholder="Available seats"
            name="availableSeats"
            value={this.state.criteria.availableSeats}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func,
};
