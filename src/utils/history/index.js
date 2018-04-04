import createHashHistory from 'history/createHashHistory';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { isDev } from '../../../conf/server-config';

// const history = isDev ? createHashHistory() : createBrowserHistory();
const history = createHashHistory();

export default history;
