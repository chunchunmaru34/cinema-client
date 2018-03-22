import React from 'react';
import { connect } from 'react-redux';
import { clearOrder, selectMovieSession } from '../actions';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentDidMount() {
    const { selectMovieSessions, movieSession, dispatch } = this.props;
    if (!selectMovieSessions) {
      dispatch(selectMovieSession(movieSession));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearOrder());
  }

  render() {
    const { movieSession } = this.props;
    return <SeatsArrangement movieSession={movieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  selectMovieSession: state.selectMovieSession,
});


export default connect(mapStateToProps)(SeatsArrangementContainer);
