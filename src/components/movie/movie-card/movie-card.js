import { withRouter } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class MovieCard extends React.Component {
    handleClick = () => {
      this.props.history.push(`movies/${this.props.id}`);
    };

    render() {
      const { posterUrl, title } = this.props;
      return (
            <div onClick={this.handleClick} className={styles.container}>
                <div className={styles.poster}>
                    <img src={posterUrl}/>
                </div>
                <div className={styles.title}>
                    {title}
                </div>
            </div>
      );
    }
}

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string,
};

const MovieCardWithRouter = withRouter(MovieCard);
export default MovieCardWithRouter;
