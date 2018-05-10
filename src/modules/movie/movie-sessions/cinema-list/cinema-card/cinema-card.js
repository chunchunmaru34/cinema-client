import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.scss';
import MovieSessionsList from '../../movie-sessions-list/movie-sessions-list-container';

const classNames = {
  enter: styles.hoverEnter,
  enterActive: styles.hoverEnterActive,
  exit: styles.hoverExit,
  exitActive: styles.hoverExitActive,
};

const CinemaCard = ({
  data, clickHandler, match, loc,
}) => (
  <div className={styles.container}>
    <div className={styles.header}
         onClick={clickHandler}>
      <span>{data.name}</span>
      <span className="ml-4">City: {data.city}</span>
    </div>
      <CSSTransition
        key={data.id}
        in={loc.pathname.startsWith(`${match.url}/cinemas/${data.id}`)}
        classNames={classNames}
        timeout={750}
      >
        <Switch>
          <Route
            path={`${match.url}/cinemas/${data.id}`}
            render={location => (
              <MovieSessionsList
                location={location}
                cinema={data}
              />
            )}
          />
        </Switch>
      </CSSTransition>
  </div>
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
