import React from 'react';
import Row from '../row/row';
import styles from './styles.scss';

const SeatsArrangements = ({ movieSession }) => {
  const rows = movieSession.seats
    .map((item, index) => <Row data={item}
                               index={index}
                               key={index}/>);
  return (
    <div className={styles.container}>
      {rows}
    </div>
  );
};

export default SeatsArrangements;
