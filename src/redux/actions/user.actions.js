import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { userConstants, ROUTES } from '../../constants';
import { userService } from '../../services';

const cookies = new Cookies();

const login = (data, history, setShowDropdown) => {
  return dispatch => {
    dispatch(request({data}));

    userService.login(data)
      .then(
        user => {
          const jwt = user.access;
          userService.obtainBearerNetwork(jwt, data)
            .then(
              networks => {
                dispatch(success(user));
                dispatch(obtainNetworkSuccess(networks));
              },
              error => {
                dispatch(obtainNetworkFailure(error.toString()));
                toast.error('Error error!', {
                  autoClose: 4000
                });
              }
            )
        },
        error => {
          dispatch(failure(error.toString()));
          setShowDropdown(false);
          toast.error('Invalid username or password.', {
            autoClose: 4000
          });
        }
      );
  }

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

  function obtainNetworkSuccess(networks) { return { type: userConstants.OBTAIN_NETWORK_SUCCESS, networks } }
  function obtainNetworkFailure(error) { return { type: userConstants.OBTAIN_NETWORK_FAILURE, error } }
}

const obtainBearerToken = (jwt, data, history) => {
  return dispatch => {
    userService.obtainBearerToken(jwt, data)
      .then(
        token => {
          history.push(ROUTES.DASHBOARD);
          window.location.reload();
          dispatch(success(token));
      },
      error => {
        dispatch(failure(error.toString()));
        toast.error('Unable to obtain bearer token.', {
          autoClose: 4000
        });
      }
    );
  }

  function success(token) { return { type: userConstants.OBTAIN_TOKEN_SUCCESS, token } }
  function failure(error) { return { type: userConstants.OBTAIN_TOKEN_FAILURE, error } }
}

const logout = (data, history) => {
  userService.logout(data)
    .then(() => {
      // remove cookie data
      cookies.remove('user', { path: '/' });
      cookies.remove('networks', { path: '/' });
      cookies.remove('obtainedBearerToken', { path: '/' });
    })

  return { type: userConstants.LOGOUT };
}

export const userActions = {
  login,
  logout,
  obtainBearerToken
}