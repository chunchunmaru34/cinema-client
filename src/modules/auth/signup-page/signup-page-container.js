import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authService } from '../../../services';
import { signUp, clearAuthError, checkIfUserAlreadyExist, loggedOut } from '../actions';
import SignUpPage from './signup-page';
import { HOME_ROUTE } from '../../../constants/routes';

class SignUpPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

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
    this.props.dispatch(clearAuthError);
  }

  handleSubmit = (credentials) => {
    if (credentials.password !== credentials.repeatedPassword) return;

    this.props.dispatch(signUp(credentials));
  };

  clearError = () => {
    this.props.dispatch(clearAuthError());
  };

  checkEmailOriginality = (email) => {
    if (email.length < 3) return;

    this.props.dispatch(checkIfUserAlreadyExist(email));
  };

  render() {
    return (
      <SignUpPage
        signUp={this.handleSubmit}
        checkEmailOriginality={this.checkEmailOriginality}
        validation={this.props.validation}
        error={this.props.error}
        clearError={this.clearError}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
  validation: state.auth.signUpValidation,
});

SignUpPageContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
  }),
  error: PropTypes.string,
  validation: PropTypes.shape({
    isEmailUnique: PropTypes.bool,
  }),
};

export default connect(mapStateToProps)(SignUpPageContainer);
