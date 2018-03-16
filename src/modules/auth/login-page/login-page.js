import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { login } from '../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.onSuccessfulLogin();
      return;
    }
    if (nextProps.error) {
      this.onFailedLogin(nextProps.error);
    }
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
    this.props.dispatch(login(credentials));
  };

  onSuccessfulLogin() {
    this.props.history.push('/');
  }

  onFailedLogin(error) {
    this.setState({ error });
  }

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
          { this.state.error &&
          <div className="alert alert-danger mt-3">
            <span>{this.state.error.message}</span>
          </div>
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
  user: state.auth.user,
  error: state.auth.error,
});

export default connect(mapStateToProps)(LoginPage);
