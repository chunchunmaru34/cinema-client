import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieSessions from './movie-sessions';

class MovieSessionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { closed: true };
  }

  toggleVisibility() {
    const {
      history, match, location,
    } = this.props;
    if (this.state.closed && location.pathname === match.url) {
      history.push(`${match.url}/cinemas`);
      this.setState({ closed: false });
    } else {
      history.push(match.url);
      this.setState({ closed: true });
    }
  }

  handleClick = () => {
    this.toggleVisibility();
  };

  render() {
    return <MovieSessions match={this.props.match} handleClick={this.handleClick}/>;
  }
}

const mapStateToProps = state => ({
  movie: state.selectedMovie.movieDetails.data,
});

export default withRouter(connect(mapStateToProps)(MovieSessionsContainer));
