import { combineReducers } from 'redux';
import ruleChainReducer from './reducer/ruleChainReducer';

const reducers = combineReducers({
  ruleChainReducer,
});

export default reducers;
