import React from 'react';
import { connect } from 'react-redux';
import { clearOrder } from '../actions';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
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
});


export default connect(mapStateToProps)(SeatsArrangementContainer);
