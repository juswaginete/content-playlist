import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isNull, isUndefined } from 'lodash';

export default function PrivateRoute({ auth, ...rest }) {
  const { user } = useSelector(state => state.userAuthentication);
  const loggedIn = useSelector(state => state.userAuthentication.loggedIn);
  return (
    loggedIn ? <Route {...rest} /> : <Redirect to="/" />
  )
}