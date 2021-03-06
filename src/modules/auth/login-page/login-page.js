import React from 'react';
import PropTypes from 'prop-types';

import DismissibleAlert from '../../util-components/alerts/dismissable-alert';
import styles from './styles.scss';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(credentials);
  };

  render() {
    return (
      <div className={styles.container}>
        <h4>Login</h4>
        <form
          onSubmit={this.handleSubmit}
          className={styles.loginForm}
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              value={this.state.email}
              className="form-control"
              name="email"
              type="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label><br/>
            <input
              onChange={this.handleChange}
              value={this.state.password}
              className="form-control"
              name="password"
              type="password"
            />
          </div>
          <button className="btn btn-primary">Login</button>

          { this.props.error &&
            <div className="mt-3">
              <DismissibleAlert
                type="danger"
                message={this.props.error}
                onDismiss={this.props.clearError}
              />
            </div>
          }
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
  clearError: PropTypes.func,
  error: PropTypes.string,
};

