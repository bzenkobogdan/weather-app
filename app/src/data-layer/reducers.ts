import { combineReducers } from 'redux';
import search from 'data-layer/search/reducer';
import user from 'data-layer/user/reducer';

const rootReducer = combineReducers({
  search,
  user,
});

export default rootReducer;
