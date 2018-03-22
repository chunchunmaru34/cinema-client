import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectMovieSession } from '../../../../ticket-reservation/actions';
import MovieSessionCard from './movie-session-card';


class MovieSessionCardContainer extends React.Component {
  onClick = () => {
    const {
      history, match, data, dispatch,
    } = this.props;
    history.push(`${match.url}/movie-sessions/${data.id}`);
    dispatch(selectMovieSession(data));
  };

  render() {
    return <MovieSessionCard data={this.props.data}
                             match={this.props.match}
                             clickHandler={this.onClick}
    />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  match: ownProps.match,
});

export default withRouter(connect(mapStateToProps)(MovieSessionCardContainer));
