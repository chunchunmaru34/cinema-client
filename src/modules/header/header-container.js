import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../auth/actions';
import Header from './header';


class HeaderContainer extends React.Component {
  onLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    return <Header user={this.props.user}
                   handleLogout={this.onLogout}/>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(HeaderContainer);
