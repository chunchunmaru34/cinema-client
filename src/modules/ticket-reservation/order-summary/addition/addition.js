import React from 'react';
import PropTypes from 'prop-types';

const Addition = ({
  data, count, increment, decrement,
}) => (
  <div>
    <span>{data.addition.name}: {data.price}$</span>
    <button className="btn btn-sm btn-primary m-sm-1"
            onClick={increment}>+</button>
    <button className="btn btn-sm btn-primary m-1"
            onClick={decrement}
    >-</button>
    <span>x{count || 0}</span>
  </div>
);

Addition.propTypes = {
  data: PropTypes.shape({
    addition: PropTypes.shape({
      name: PropTypes.string,
    }),
    price: PropTypes.number,
  }),
  count: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

export default Addition;

