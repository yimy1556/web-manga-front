import { connectRouter } from 'connected-react-router';
import auth from 'src/modules/auth/authReducers';
import { combineReducers } from 'redux';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
  });
