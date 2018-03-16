import React from 'react';
import { connect } from 'react-redux';
import { checkForAuthenticatedUser } from './auth/actions';
import App from './app';

class AppContainer extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.dispatch(checkForAuthenticatedUser());
    }
  }

  render() {
    return <App/>;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AppContainer);
