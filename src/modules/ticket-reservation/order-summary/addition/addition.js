import React from 'react';

const Addition = ({
  data, count, increment, decrement,
}) => (
  <div>
    {data.addition.name}: {data.price}$
    <button className="btn btn-sm btn-primary"
            onClick={() => increment(data)}>+</button>
    {count > 0 && <button className="btn btn-sm btn-primary"
                          onClick={() => decrement(data)}>-</button>}
    {count > 0 && <span>x{count}</span>}
  </div>
);

export default Addition;

