import React from 'react';
import Row from '../row/row';
import styles from './styles.scss';

export default class SeatsArrangements extends React.Component {
  render() {
    const { cinema, movieSession } = this.props;
    const room = cinema.rooms.find(item => item.codeName === movieSession.roomCodeName);
    const rows = room.rows.map(item => <Row data={item} movieSession={movieSession}/>);
    return (
      <div className={styles.container}>
        {rows}
      </div>
    );
  }
}

