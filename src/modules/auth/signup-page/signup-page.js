/* eslint-disable no-useless-escape,no-return-assign */
import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { USER_ALREADY_EXIST, PASSWORDS_SHOULD_MATCH } from './constants/validation-alerts';
import styles from './styles.scss';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      repeatedPassword: '',
      city: '',
      passwordsDoesNotMatch: false,
    };
    this.onCheckEmailDebounce = debounce(email => this.props.checkEmailOriginality(email), 500);
  }

  passwordPattern = '(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

  componentWillReceiveProps(nextProps) {
    if (!nextProps.validation.isEmailUnique) {
      this.email.setCustomValidity(USER_ALREADY_EXIST);
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleEmailChange = (e) => {
    e.target.setCustomValidity('');
    this.onCheckEmailDebounce(e.target.value);
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    const matches = e.target.value === this.state.repeatedPassword;
    this.setState({
      password: e.target.value,
      passwordsDoesNotMatch: !matches,
    });
    if (!matches) {
      this.repeatedPassword.setCustomValidity(PASSWORDS_SHOULD_MATCH);
    } else {
      this.repeatedPassword.setCustomValidity('');
    }
  };

  handleRepeatedPasswordChange = (e) => {
    const matches = e.target.value === this.state.password;
    this.setState({
      repeatedPassword: e.target.value,
      passwordsDoesNotMatch: !matches,
    });
    if (!matches) {
      e.target.setCustomValidity(PASSWORDS_SHOULD_MATCH);
    } else {
      e.target.setCustomValidity('');
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      repeatedPassword: this.state.repeatedPassword,
      name: this.state.name || undefined,
      city: this.state.city || undefined,
    };
    this.props.signUp(credentials);
  };

  render() {
    return (
      <div className={styles.container}>
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}
              className={`${styles.signUpForm} was-validated`}>

          {/* Email */}
          <div className="form-group">
            <label>Email*</label>
            <input name='email'
                   type='email'
                   className="form-control"
                   required
                   maxLength="50"
                   ref={element => this.email = element}
                   value={this.state.email}
                   onChange={this.handleEmailChange}/>
            { !this.props.validation.isEmailUnique &&
              <div className="invalid-feedback">
                {USER_ALREADY_EXIST}
              </div>
            }
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password*</label>
            <input name='password'
                   type='password'
                   className="form-control"
                   required
                   maxLength="20"
                   pattern={this.passwordPattern}
                   value={this.state.password}
                   onChange={this.handlePasswordChange}/>
            <small className="form-text text-muted">
              Your password must be 8-20 characters long
              and contain letters and numbers.
            </small>
          </div>

          {/* Repeated password */}
          <div className="form-group">
            <label>Repeat password*</label>
            <input name='repeatedPassword'
                   type='password'
                   className="form-control"
                   required
                   maxLength="20"
                   ref={element => this.repeatedPassword = element}
                   pattern={this.passwordPattern}
                   value={this.state.repeatedPassword}
                   onChange={this.handleRepeatedPasswordChange}/>
            {this.state.passwordsDoesNotMatch &&
              <div className="invalid-feedback">
                {PASSWORDS_SHOULD_MATCH}
              </div>
            }
          </div>

          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input name='name'
                   maxLength="50"
                   className="form-control"
                   value={this.state.name}
                   onChange={this.handleChange}/>
          </div>

          {/* City */}
          <div className="form-group">
            <label>City</label>
            <input name='city'
                   maxLength="50"
                   className="form-control"
                   value={this.state.city}
                   onChange={this.handleChange}/>
          </div>

          {/* Tips */}
          <div className="mb-3">
            <small className="form-text text-muted">* - required fields</small>
          </div>

          {/* Submit */}
          <button className="btn btn-primary">Submit</button>
          { this.props.error &&
            <div className="alert alert-danger mt-3">
              {this.props.error.message}
            </div>
          }
        </form>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  validation: PropTypes.shape({
    isEmailUnique: PropTypes.bool,
  }),
  checkEmailOriginality: PropTypes.func,
  signUp: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

