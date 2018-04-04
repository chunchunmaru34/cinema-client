import React from 'react';
import PropTypes from 'prop-types';
import CinemaCard from './cinema-card/cinema-card-container';

const CinemaList = ({ cinemas }) => {
  const cinemaList = cinemas.map(item => <CinemaCard data={item}
                                                     key={item.id}/>);
  return (
    <div>
      {cinemaList.length ?
        <span>Choose cinema</span>
          :
        <span>Currently no available sessions</span>
      }
      {cinemaList}
    </div>
  );
};

CinemaList.propTypes = {
  cinemas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rooms: PropTypes.array,
    roomsCount: PropTypes.number,
  })),
};

export default CinemaList;
