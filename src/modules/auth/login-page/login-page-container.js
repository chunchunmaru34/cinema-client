import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, clearAuthError } from '../actions';
import LoginPage from './login-page';

class LoginPageContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthError());
  }

  onLogin = (credentials) => {
    this.props.dispatch(login(credentials));
  } ;

  render() {
    return <LoginPage error={this.props.error}
                      login={this.onLogin}/>;
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
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default connect(mapStateToProps)(LoginPageContainer);
