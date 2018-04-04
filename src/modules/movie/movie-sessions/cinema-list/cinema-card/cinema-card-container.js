import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCinema, unselectCinema } from '../../actions';
import CinemaCard from './cinema-card';

class CinemaCardContainer extends React.Component {
  handleClick = () => {
    const {
      dispatch, cinema, history, match, selectedCinema,
    } = this.props;

    if (selectedCinema && selectedCinema.id === cinema.id) {
      dispatch(unselectCinema());
      history.push(match.url);
    } else {
      dispatch(selectCinema(cinema));
      history.push(`${match.url}/cinemas/${cinema.id}`);
    }
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
  selectedCinema: state.selectedMovie.movieSessions.selectedCinema,
  cinema: ownProps.data,
});

export default withRouter(connect(mapStateToProps)(CinemaCardContainer));
