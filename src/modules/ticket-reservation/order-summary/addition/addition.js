import React from 'react';

const Addition = ({
  data, count, increment, decrement,
}) => (
  <div>
    {data.addition.name}: {data.price}$
    <button className="btn btn-sm btn-primary m-sm-1"
            onClick={() => increment(data)}>+</button>
    <button className="btn btn-sm btn-primary m-1"
            onClick={() => {
              if (count > 0) decrement(data);
            }}
    >-</button>
    <span>x{count || 0}</span>
  </div>
);

export default Addition;

