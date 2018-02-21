import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCinemas } from '../../../actions/cinema-actions';
import CinemaList from './cinema-list';

class CinemaListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCinemas());
  }
  render() {
    return this.props.cinemas ? <CinemaList cinemas={this.props.cinemas}/> : '';
  }
}

const mapStateToProps = state => ({
  cinemas: state.cinemas.data,
});

CinemaListContainer.propTypes = {
  cinemas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    rooms: PropTypes.array,
    roomsCount: PropTypes.number,
  })),
};

export default connect(mapStateToProps)(CinemaListContainer);
