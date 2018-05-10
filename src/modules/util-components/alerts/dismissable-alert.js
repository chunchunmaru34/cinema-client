import React from 'react';

const DismissibleAlert = ({ message, onDismiss }) => (
  <div className="alert alert-danger alert-dismissible">
    <span>{message}</span>
    <button
      onClick={onDismiss}
      type="button"
      className="close"
    >
      <span>&times;</span>
    </button>
  </div>
);

export default DismissibleAlert;
