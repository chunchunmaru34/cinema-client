import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { login } from '../actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  match: ownProps.match,
});

export default connect(mapStateToProps)(LoginPage);
