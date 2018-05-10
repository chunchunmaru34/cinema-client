import React from 'react';
import PropTypes from 'prop-types';

import CinemaCard from './cinema-card/cinema-card-container';
import SearchBar from './search-bar/search-bar-container';
import LoadingBar from '../../../util-components/loading-bar';

const CinemaList = ({ cinemas, isLoading }) => {
  if (cinemas && !cinemas.length) {
    return <div>There are no available movie sessions</div>;
  }

  const cinemaList = cinemas && cinemas.map(item => (
    <CinemaCard data={item} key={item.id}/>
  ));

  return (
    <div>
      <span>Choose cinema</span>
      <SearchBar/>
      {isLoading ? <LoadingBar/> : cinemaList}
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
