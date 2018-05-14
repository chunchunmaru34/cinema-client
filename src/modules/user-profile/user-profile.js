import React from 'react';
import { connect } from 'react-redux';

import history from '../../utils/history';
import UserInfo from './user-info/user-info-container';
import TicketList from './ticket-list/ticket-list-container';
import styles from './styles.scss';
import { LOGIN_ROUTE } from '../../constants/routes';

class UserProfile extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      history.push(LOGIN_ROUTE);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      history.push(LOGIN_ROUTE);
    }
  }

  render() {
    if (!this.props.user) {
      return null;
    }

    return (
      <div className={styles.container}>
        <UserInfo/>
        <TicketList/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserProfile);
