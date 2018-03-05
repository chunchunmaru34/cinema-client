import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCinema } from '../../actions';
import CinemaCard from './cinema-card';

class CinemaCardContainer extends React.Component {
  handleClick = () => {
    const {
      dispatch, cinema, history, match,
    } = this.props;
    dispatch(selectCinema(cinema));
    history.push(`${match.url}/${cinema.id}`);
  };

  render() {
    const { cinema, match } = this.props;
    return <CinemaCard data={cinema}
                       key={cinema.id}
                       clickHandler={this.handleClick}
                       match={match}
    />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  cinema: ownProps.data,
});

export default withRouter(connect(mapStateToProps)(CinemaCardContainer));
