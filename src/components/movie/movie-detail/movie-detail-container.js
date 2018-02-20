import React from 'react';
import MovieDetail from './movie-detail';
import { MOVIES_PATH } from '../../../../conf/api-paths';

export default class MovieDetailContainer extends React.Component {
  componentDidMount() {
    this.getMovieData();
  }

    getMovieData = () => {
      fetch(`${MOVIES_PATH}/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(res => this.setState({ movie: res }));
    };

    render() {
      return (this.state && this.state.movie) ? <MovieDetail movie={this.state.movie}/> : '';
    }
}

