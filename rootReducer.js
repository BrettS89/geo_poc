import { combineReducers } from 'redux';
import { speedReducer } from './actions';

export default combineReducers({
  speed: speedReducer,
});
