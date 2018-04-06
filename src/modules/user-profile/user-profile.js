import React from 'react';
import gravatar from 'gravatar';
import TicketList from './ticket-list/ticket-list-container';
import styles from './styles.scss';

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
    const { user, isEditingCity, isEditingName } = this.state;
    const { error, info } = this.props;

    return (
      <div className={styles.container}>
        <div>
          <div className={styles.info}>

            {/* Profile pic */}
            <div className={styles.profilePic}>
              <img src={gravatar.url(user.email, { s: '220', r: 'pg' })}/>
            </div>

            <div className={styles.details}>
              {/* Name */}
              <div className={`${styles.infoLine} input-group`}>
                <label>Name: </label>
                { this.state.isEditingName ?
                  <input className="form-control"
                         value={user.name}
                         onChange={this.handleChange}
                         maxLength="30"
                         name="name"/>
                  :
                  <span>{user.name}</span>
                }
                <button className="btn btn-sm btn-outline-primary"
                        onClick={this.toggleEdit}
                        name="Name">{isEditingName ? 'Save' : 'Edit'}</button>
              </div>

              {/* City */}
              <div className={`${styles.infoLine} input-group`}>
                <label>City: </label>
                { this.state.isEditingCity ?
                  <input className="form-control"
                         value={user.city}
                         onChange={this.handleChange}
                         maxLength="30"
                         name="city"/>
                  :
                  <span>{user.city}</span>
                }
                <button onClick={this.toggleEdit}
                        className="btn btn-sm btn-outline-primary"
                        name="City">{isEditingCity ? 'Save' : 'Edit'}</button>
              </div>
              {/* Email */}
              <div>Email: {user.email}</div>
            </div>
          </div>

          <div className="text-center mt-5">
            <button onClick={this.onSubmit}
                    className="btn btn-primary">Update Info</button>
          </div>
        </div>

        {/* After-action info */}
        { error &&
            <div className="alert-danger alert mt-3">
              {error}
            </div>
        }
        { info &&
        <div className="alert alert-success mt-3">
          {info}
        </div>
        }

        <TicketList/>
      </div>
    );
  }
}
