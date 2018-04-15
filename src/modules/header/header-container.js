import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { loggedOut } from '../auth/actions';
import { authService } from '../../services';
import { LOGIN_ROUTE } from '../../constants/routes';
import Header from './header';

class HeaderContainer extends React.Component {
  onLogout = () => {
    authService.logout();
    this.props.dispatch(loggedOut());
    history.push(LOGIN_ROUTE);
  };

  render() {
    return (
      <Header
        user={this.props.user}
        handleLogout={this.onLogout}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

HeaderContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    exp: Number,
  }),
};

export default connect(mapStateToProps)(HeaderContainer);
