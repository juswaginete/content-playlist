import { combineReducers } from 'redux';
import { userAuthentication } from './user.reducers';

const rootReducer = combineReducers({
  userAuthentication
});

export default rootReducer;
