import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp, clearAuthError, checkIfUserAlreadyExist } from '../actions';
import SignUpPage from './signup-page';

class SignUpPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

  handleSubmit = (credentials) => {
    this.props.dispatch(signUp(credentials));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      clearTimeout(this.state.timer);
      this.state.timer = setTimeout(() => this.props.dispatch(clearAuthError()), 5000);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthError);
    clearTimeout(this.state.timer);
  }

  checkEmailOriginality = (email) => {
    this.props.dispatch(checkIfUserAlreadyExist(email));
  };

  render() {
    return <SignUpPage signUp={this.handleSubmit}
                       checkEmailOriginality={this.checkEmailOriginality}
                       error={this.props.error}/>;
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

SignUpPageContainer.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default connect(mapStateToProps)(SignUpPageContainer);
