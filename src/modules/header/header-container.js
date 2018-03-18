import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loggedOut } from '../auth/actions';
import { authService } from '../../services';
import Header from './header';

class HeaderContainer extends React.Component {
  onLogout = () => {
    authService.logout();
    this.props.dispatch(loggedOut());
  };

  render() {
    return <Header user={this.props.user}
                   handleLogout={this.onLogout}/>;
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
