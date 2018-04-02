/* eslint-disable no-useless-escape */
import React from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
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
    };
    this.onCheckEmailDebounce = debounce(email => this.props.checkEmailOriginality(email), 250);
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleEmailChange = (e) => {
    this.onCheckEmailDebounce(e.target.value);
    this.setState({ email: e.target.value });
  };

  handleRepeatedPasswordChange = (e) => {
    const matches = e.target.value === this.state.password;
    this.setState({
      repeatedPassword: e.target.value,
      isPasswordsMatch: matches,
    });
    if (!matches) {
      e.target.setCustomValidity('Password should match');
    } else {
      e.target.setCustomValidity('');
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    if (credentials.password !== this.state.repeatedPassword) {
      return;
    }
    this.props.signUp(credentials);
  };

  passwordPattern = '(?=.*?[a-z])(?=.*?[0-9]).{8,}$';

  render() {
    return (
      <div className={styles.container}>
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit}
              className={`${styles.signUpForm} was-validated`}>
          <div className="form-group">
            <label>Email*</label>
            <input name='email'
                   type='email'
                   className="form-control"
                   required
                   value={this.state.email}
                   onChange={this.handleEmailChange}/>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input name='name'
                   className="form-control"
                   value={this.state.name}
                   onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>Password*</label>
            <input name='password'
                   type='password'
                   className="form-control"
                   required
                   pattern={this.passwordPattern}
                   value={this.state.password}
                   onChange={this.handleChange}/>
            <small className="form-text text-muted">
              Your password must be 8-20 characters long
              and contain letters and numbers.
            </small>
          </div>
          <div className="form-group">
            <label>Repeat password*</label>
            <input name='repeatedPassword'
                   type='password'
                   className="form-control"
                   required
                   pattern={this.passwordPattern}
                   value={this.state.repeatedPassword}
                   onChange={this.handleRepeatedPasswordChange}/>
            {!this.state.isPasswordsMatch &&
              <div className="invalid-feedback">
               Passwords should match
              </div>
            }
          </div>
          <div className="form-group">
            <label>City</label>
            <input name='city'
                   className="form-control"
                   value={this.state.city}
                   onChange={this.handleChange}/>
          </div>
          <div className="mb-3">
            <small className="form-text text-muted">* - required fields</small>
          </div>
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
  signUp: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

