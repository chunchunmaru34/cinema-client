import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingBar from '../utils/loading-bar';
import {
  fetchUser,
  updateUser,
  clearError,
  clearInfo,
  clearState,
} from './actions';
import UserProfile from './user-profile';

class UserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch(fetchUser(user.id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearState());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.error) {
      dispatch(clearInfo());
      return;
    }
    if (nextProps.info) {
      clearTimeout(this.state.timer);
      this.props.dispatch(clearError());
      const timer = setTimeout(() => dispatch(clearInfo()), 5000);
      this.setState({ timer });
    }
  }

  handleSubmit = (user) => {
    this.props.dispatch(updateUser(user));
  };

  render() {
    const {
      userDetails, info, error, isLoading,
    } = this.props;
    const component = <UserProfile user={userDetails}
                                   info={info}
                                   error={error}
                                   updateUser={this.handleSubmit}/>;
    const loading = <LoadingBar isLoading={isLoading}/>;
    return isLoading ? loading : component;
  }
}

const mapStateToProps = state => ({
  info: state.profile.info,
  error: state.profile.error,
  user: state.auth.user,
  userDetails: state.profile.userDetails,
  isLoading: state.profile.isLoading,
});

UserProfileContainer.propTypes = {
  info: PropTypes.string,
  error: PropTypes.string,
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
