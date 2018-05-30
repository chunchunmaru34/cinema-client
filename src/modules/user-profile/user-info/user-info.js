import React from 'react';
import PropTypes from 'prop-types';
import gravatar from 'gravatar';

import DismissibleAlert from '../../util-components/alerts/dismissable-alert';
import styles from './styles.scss';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isEditingName: false,
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
    const {
      user, isEditingName,
    } = this.state;
    const {
      error, info, clearError, clearInfo,
    } = this.props;

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
                    <input
                      className="form-control"
                      value={user.name}
                      onChange={this.handleChange}
                      maxLength="30"
                      name="name"
                    />
                  :
                    <span>{user.name}</span>
                }
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={this.toggleEdit}
                  name="Name"
                >
                  {isEditingName ? 'Save' : 'Edit'}
                </button>
              </div>

              {/* Email */}
              <div>Email: {user.email}</div>

            </div>
          </div>

          <div className="text-center mt-5">
            <button
              onClick={this.onSubmit}
              className="btn btn-primary"
            >
              Update Info
            </button>
          </div>
        </div>

        {/* After-action info */}
        { error &&
            <div className="mt-3">
              <DismissibleAlert
                type="danger"
                message={error}
                onDismiss={clearError}
              />
            </div>
        }
        { info &&
            <div className="mt-3">
              <DismissibleAlert
                type="success"
                message={info}
                onDismiss={clearInfo}
              />
            </div>
        }

      </div>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  error: PropTypes.string,
  info: PropTypes.string,
  clearError: PropTypes.func,
  clearInfo: PropTypes.func,
};

export default UserInfo;
