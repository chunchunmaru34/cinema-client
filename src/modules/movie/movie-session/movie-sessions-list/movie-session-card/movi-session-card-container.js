import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieSessionCard from './movie-session-card';


class MovieSessionCardContainer extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(clearOrder());
  }

  onClick = () => {
    const {
      history, match, data,
    } = this.props;
    history.push(`${match.url}/movie-sessions/${data.id}`);
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
