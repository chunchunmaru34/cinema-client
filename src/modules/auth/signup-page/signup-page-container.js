import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp, clearAuthError } from '../actions';
import SignUpPage from './signup-page';

class SignUpPageContainer extends React.Component {
  handleSubmit = (credentials) => {
    this.props.dispatch(signUp(credentials));
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthError);
  }

  render() {
    return <SignUpPage signUp={this.handleSubmit}
                       error={this.props.error}/>;
  }
}

const mapStateToPops = state => ({
  error: state.auth.error,
});

SignUpPageContainer.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default connect(mapStateToPops)(SignUpPageContainer);
