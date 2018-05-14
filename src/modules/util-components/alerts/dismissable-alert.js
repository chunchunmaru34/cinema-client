import React from 'react';

const DismissibleAlert = ({ message, onDismiss, type }) => (
  <div className={`alert alert-${type} alert-dismissible`}>
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
