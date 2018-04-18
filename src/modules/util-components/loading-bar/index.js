import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingBar = () => (
  <div className="text-center m-3">
    <ClipLoader color={'#343a40'}/>
  </div>
);

export default LoadingBar;
