// reducers/index.js

import { combineReducers } from 'redux';
import RepoReducer from './RepoReducer';

const rootReducer = combineReducers({
  repositories: RepoReducer,
  // Add more reducers here if needed
});

export default rootReducer;
