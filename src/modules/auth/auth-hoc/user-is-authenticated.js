import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

const UserIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: state => state.auth.user,
  redirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated',
});

export default UserIsAuthenticated;
