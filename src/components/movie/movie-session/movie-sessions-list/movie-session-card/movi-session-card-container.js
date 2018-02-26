import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieSessionCard from './movie-session-card';


class MovieSessionCardContainer extends React.Component {
  onClick = () => {
    const {
      history, url, data,
    } = this.props;

    history.push(`${url}/movie-sessions/${data.id}`);
  };

  render() {
    return <MovieSessionCard data={this.props.data}
                             url={this.props.url}
                             clickHandler={this.onClick}
    />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  url: ownProps.match.url,
});


export default withRouter(connect(mapStateToProps)(MovieSessionCardContainer));
