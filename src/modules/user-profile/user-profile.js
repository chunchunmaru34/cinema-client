import React from 'react';
import gravatar from 'gravatar';
import styles from './styles.css';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isEditingName: false,
      isEditingCity: false,
    };
  }

  toggleEdit = (e) => {
    const { name } = e.target;
    this.setState({ [`isEditing${name}`]: !this.state[`isEditing${name}`] });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({
      user,
    });
  };

  onSubmit = () => {
    this.props.updateUser(this.state.user);
  };

  render() {
    const { user } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.profilePic}>
            <img src={gravatar.url(user.email, { s: '220', r: 'pg' })}/>
          </div>
          <div className={styles.details}>
            <div>
              { this.state.isEditingName ?
                <input value={user.name}
                       onChange={this.handleChange}
                       name="name"/>
                :
                <span>Name: {user.name}</span>
              }
              <button onClick={this.toggleEdit}
                      name="Name">Edit</button>
            </div>
            <div>
              { this.state.isEditingCity ?
                  <input value={user.city}
                         onChange={this.handleChange}
                         name="city"/>
                :
                  <span>City: {user.city}</span>
              }
              <button onClick={this.toggleEdit} name="City">Edit</button>
            </div>
            <div>Email: {user.email}</div>
          </div>
        </div>
        { this.props.error &&
            <div className="alert-danger alert">
              {this.props.error}
            </div>
        }
        <div className="text-center mt-5">
          <button onClick={this.onSubmit}
                  className="btn btn-primary">Update Info</button>
        </div>
      </div>
    );
  }
}
