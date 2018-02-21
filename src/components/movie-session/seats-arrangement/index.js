import React from 'react';
import styles from './styles.scss';

export default class SeatsArrangement extends React.Component {
  render() {
    const { match, data } = this.props;
    const session = data.find(item => item.id === match.params.id);
    return (
      <div className={styles.container}>test
        {session ? session.id : ''}
      </div>
    );
  }
}
