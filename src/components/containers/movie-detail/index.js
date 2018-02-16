import React from 'react';
import MovieDetail from '../../presentations/movie-detail/index';
import { MOVIES_PATH } from '../../../../conf/api-paths';

export default class MovieDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        };
    }

    componentDidMount() {
        this.getMovieData();
    }

    getMovieData = () => {
        fetch(MOVIES_PATH + "/" + this.props.match.params.id)
            .then(res => res.json())
            .then(res => this.setState({ movie: res }))
    };
    render() {
        return React.createElement(MovieDetail, { movie: this.state.movie })
    }
}

