import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchUser,
  updateUser,
  clearError,
  clearInfo,
  clearState,
} from '../actions';
import UserInfo from './user-info';
import LoadingBar from '../../util-components/loading-bar/index';
import { LOGIN_ROUTE } from '../../../constants/routes';

class UserInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

  componentDidMount() {
    const { user, dispatch, history } = this.props;

    if (!user) {
      history.push(LOGIN_ROUTE);
      return;
    }

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
      dispatch(clearError());
    }
  }

  handleUpdate = (user) => {
    this.props.dispatch(updateUser(user));
  };

  onClearError = () => {
    this.props.dispatch(clearError());
  };

  onClearInfo = () => {
    this.props.dispatch(clearInfo());
  };

  render() {
    const {
      userDetails, info, error, isLoading,
    } = this.props;

    const component = (
      <UserInfo
        user={userDetails}
        info={info}
        error={error}
        clearInfo={this.onClearInfo}
        clearError={this.onClearError}
        updateUser={this.handleUpdate}
      />
    );

    return isLoading ? <LoadingBar/> : component;
  }
}

const mapStateToProps = state => ({
  info: state.profile.info,
  error: state.profile.error,
  user: state.auth.user,
  userDetails: state.profile.userDetails,
  isLoading: state.profile.isLoading,
});

UserInfoContainer.propTypes = {
  info: PropTypes.string,
  error: PropTypes.string,
  user: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.string,
    exp: Number,
  }),
  userDetails: PropTypes.shape({
    role: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default connect(mapStateToProps)(UserInfoContainer);
