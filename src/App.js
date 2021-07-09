import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import { useSelector } from 'react-redux';
import { isNull, isUndefined } from 'lodash';

import './App.scss';
import { ROUTES } from './constants/routes';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import UploadContent from './views/UploadContent';
import LiveContent from './views/LiveContent';
import Playlist from './views/Playlist';

function App() {
  const { user } = useSelector(state => state.userAuthentication);
  const loggedIn = useSelector(state => state.userAuthentication.loggedIn);

  return (
    <CookiesProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
      <Router>
        <Switch>
          {/* <Route exact path={ROUTES.LOGIN} render={() => ( <Login /> )} /> */}
          <Route exact path={ROUTES.LOGIN} render={() => (
            loggedIn ? <Redirect to={ROUTES.DASHBOARD} /> : <Login />
          )} />
          <PrivateRoute path={ROUTES.DASHBOARD} auth={loggedIn ? user : null} component={Dashboard} />
          <PrivateRoute path={ROUTES.UPLOADCONTENT} auth={loggedIn ? user : null} component={UploadContent} />
          <PrivateRoute path={ROUTES.LIVECONTENT} auth={loggedIn ? user : null} component={LiveContent} />
          <PrivateRoute path={ROUTES.PLAYLIST} auth={loggedIn ? user : null} component={Playlist} />
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
