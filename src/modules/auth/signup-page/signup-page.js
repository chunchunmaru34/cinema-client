import React from 'react';
import styles from './styles.scss';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repeatedPassword: '',
    };
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
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

  render() {
    return (
      <div className={styles.container}>
        <h3>Sign Up</h3>
        <form>
          <div>
            <label>Email</label>
            <input name='email'
                   type='email'
                   value={this.state.email}
                   onChange={this.handleChange}/>
          </div>
          <div>
            <label>Password</label>
            <input name='password'
                   type='password'
                   value={this.state.password}
                   onChange={this.handleChange}/>
          </div>
          <div>
            <label>Repeat passwords</label>
            <input name='repeatedPassword'
                   type='password'
                   value={this.state.repeatedPassword}
                   onChange={this.handleChange}/>
          </div>
          <button onClick={this.handleSubmit}
                  className="btn btn-primary">Submit</button>
          { this.props.error &&
            <div className="alert alert-danger">
              {this.props.error.message}
            </div>
          }
        </form>
      </div>
    );
  }
}
