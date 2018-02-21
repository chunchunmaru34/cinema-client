import React from 'react';
import PropTypes from 'prop-types';
import CinemaCard from './cinema-card/cinema-card-container';

const CinemaList = ({ cinemas }) => (
  <div>
    Choose cinema
    {cinemas.map(item => <CinemaCard data={item} key={item.id}/>)}
  </div>
);

CinemaList.propTypes = {
  cinemas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    rooms: PropTypes.array,
    roomsCount: PropTypes.number,
  })),
};

export default CinemaList;
