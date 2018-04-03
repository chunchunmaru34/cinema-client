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
    if (nextProps.error) {
      clearTimeout(this.state.timer);
      this.state.timer = setTimeout(() => this.props.dispatch(clearAuthError()), 5000);
    }
    if (nextProps.user) {
      this.props.history.push(HOME_ROUTE);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthError);
    clearTimeout(this.state.timer);
  }

  handleSubmit = (credentials) => {
    if (credentials.password !== credentials.repeatedPassword) return;
    this.props.dispatch(signUp(credentials));
  };


  checkEmailOriginality = (email) => {
    if (email.length < 3) return;
    this.props.dispatch(checkIfUserAlreadyExist(email));
  };

  render() {
    return <SignUpPage signUp={this.handleSubmit}
                       checkEmailOriginality={this.checkEmailOriginality}
                       validation={this.props.validation}
                       error={this.props.error}/>;
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
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  validation: PropTypes.shape({
    isEmailUnique: PropTypes.bool,
  }),
};

export default connect(mapStateToProps)(SignUpPageContainer);
