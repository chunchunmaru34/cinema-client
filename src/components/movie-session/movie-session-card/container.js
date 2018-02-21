import React from 'react';
import { connect } from 'react-redux';
import MovieSessionCard from './index';

class MovieSessionCardContainer extends React.Component {
  componentDidMount() {
    // todo
  }
  render() {
    return <MovieSessionCard/>;
  }
}

export default connect(MovieSessionCardContainer);
