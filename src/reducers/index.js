// ====================================================================================================
// [Reducers]
// ====================================================================================================
import { combineReducers } from 'redux';
import app from './app';

const appReducer = combineReducers({
  app,
});

export default appReducer;
