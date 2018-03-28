import React from 'react';
import PropTypes from 'prop-types';
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
        <form onSubmit={this.handleSubmit}
              className={styles.loginForm}>
          <div>
            <label htmlFor="email">Email</label><br/>
            <input onChange={this.handleChange}
                   value={this.state.email}
                   name="email"
                   type="email"/>
          </div>
          <div>
            <label htmlFor="password">Password</label><br/>
            <input onChange={this.handleChange}
                   value={this.state.password}
                   name="password"
                   type="password"/>
          </div>
          <button>Login</button>
          <div>
            {this.state.name}
          </div>
          { this.props.error &&
          <div className="alert alert-danger mt-3">
            <span>{this.props.error.message}</span>
          </div>
          }
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

