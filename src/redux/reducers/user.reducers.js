import { userConstants } from '../../constants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let user = cookies.get('user');
let networks = cookies.get('networks');
let bearerToken = cookies.get('obtainedBearerToken');

export const initialState = user && networks && bearerToken ? ({
    user,
    networks,
    loggedIn: true,
    loggingIn: false,
  }) : ({
    user: null,
    networks: null,
    loggedIn: false,1
    loggingIn: false,
  });

export function userAuthentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      cookies.set('user', action.user.access, {
        path: '/',
        // httpOnly: true,
        secure: true,
        sameSite: 'strict'
      });

      return {
        ...state,
        loggedIn: false,
        loggingIn: true,
        user: action.user.access
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
      };
    case userConstants.OBTAIN_NETWORK_SUCCESS:
      cookies.set('networks', action.networks, {
        path: '/',
        secure: true,
        sameSite: 'strict'
      });

      return {
        ...state,
        networks: action.networks
      }
    case userConstants.OBTAIN_NETWORK_FAILURE:
      return {
        loggingIn: false,
      };
    case userConstants.OBTAIN_TOKEN_SUCCESS:
      cookies.set('obtainedBearerToken', 'true', {
        path: '/',
        secure: true,
        sameSite: 'strict'
      });

      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        user: action.user.access,
        networks: action.networks
      }
    case userConstants.OBTAIN_TOKEN_FAILURE:
      return {
        loggingIn: false,
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        loggingIn: false,
        user: null,
        networks: null
      }
    default:
      return state
  }
}
