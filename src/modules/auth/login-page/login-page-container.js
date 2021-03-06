import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authService } from '../../../services';
import { login, loggedOut, clearAuthError } from '../actions';
import LoginPage from './login-page';
import { HOME_ROUTE } from '../../../constants/routes';

class LoginPageContainer extends React.Component {
  componentDidMount() {
    const { user, dispatch } = this.props;

    if (user) {
      authService.logout();
      dispatch(loggedOut());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.history.push(HOME_ROUTE);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthError());
  }

  onLogin = (credentials) => {
    this.props.dispatch(login(credentials));
  };

  clearError = () => {
    this.props.dispatch(clearAuthError());
  };

  render() {
    return (
      <LoginPage
        error={this.props.error}
        login={this.onLogin}
        clearError={this.clearError}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  user: state.auth.user,
  error: state.auth.error,
});

LoginPageContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    exp: Number,
  }),
  error: PropTypes.string,
};

export default connect(mapStateToProps)(LoginPageContainer);
