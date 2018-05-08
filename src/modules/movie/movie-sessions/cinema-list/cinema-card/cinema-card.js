import React from 'react';
import { Route } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import MovieSessionsList from '../../movie-sessions-list/movie-sessions-list-container';

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const CinemaCard = ({ data, clickHandler, match }) => (
  <Transition timeout={300} in={true}>
  <div className={styles.container} style={transitionStyles}>
    <div className={styles.header}
         onClick={clickHandler}>
      <span>{data.name}</span>
      <span className="ml-4">City: {data.city}</span>
      </div>
    <Route path={`${match.url}/cinemas/${data.id}`}
           render={location => <MovieSessionsList location={location}
                                                  cinema={data}/>}
    />
  </div>
  </Transition>
);

CinemaCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rooms: PropTypes.array,
  }),
  clickHandler: PropTypes.func,
  match: PropTypes.object,
};

export default CinemaCard;
