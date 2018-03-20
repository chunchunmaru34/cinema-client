import React from 'react';
import Row from '../row/row';
import styles from './styles.scss';

export default class SeatsArrangements extends React.Component {
  render() {
    const { movieSession } = this.props;
    const rows = movieSession.seats
      .map((item, index) => <Row data={item}
                                 index={index}
                                 key={index}/>);
    return (
      <div className={styles.container}>
        {rows}
      </div>
    );
  }
}

