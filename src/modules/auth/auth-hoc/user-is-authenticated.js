import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

import { LOGIN_ROUTE } from '../../../constants/routes';

const UserIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => !!state.auth.user,
  redirectPath: LOGIN_ROUTE,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default UserIsAuthenticated;
