import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingBar = ({ isLoading }) => (
  <div className="text-center m-3">
    <ClipLoader loading={isLoading} color={'#343a40'}/>
  </div>
);

export default LoadingBar;
