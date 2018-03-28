import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from './actions';
import UserProfile from './user-profile';

class UserProfileContainer extends React.Component {
  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(fetchUser(user.id));
  }

  handleSubmit = (user) => {
    this.props.dispatch(updateUser(user));
  };

  render() {
    const { userDetails } = this.props;
    return userDetails && <UserProfile user={ userDetails }
                                       updateUser={this.handleSubmit}/>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userDetails: state.profile.userDetails,
});

UserProfileContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    exp: Number,
  }),
  userDetails: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default connect(mapStateToProps)(UserProfileContainer);
