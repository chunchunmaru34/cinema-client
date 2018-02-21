import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCinema } from '../../../../actions/cinema-actions';
import CinemaCard from './cinema-card';

class CinemaCardContainer extends React.Component {
  handleClick = () => {
    const {
      dispatch, match, cinema, history,
    } = this.props;
    dispatch(selectCinema(cinema));
    history.push(`${match.url}/cinemas/${cinema.id}`);
  };

  render() {
    const { cinema } = this.props;
    return <CinemaCard data={cinema} key={cinema.id} clickHandler={this.handleClick}/>;
  }
}

const mapStateToProps = (state, ownState) => ({
  cinema: ownState.data,
});

export default connect(mapStateToProps)(withRouter(CinemaCardContainer));
