// store.js

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'; // If you're using Redux Saga
import rootReducer from '../src/reducers/RepoReducer'; // Your root reducer
import rootSaga from '../src/sagas/RepoSaga'; // Your root saga (if using Redux Saga)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer, // Your root reducer
  applyMiddleware(sagaMiddleware) // Apply middleware (e.g., Redux Saga)
);

// Run your root saga (if using Redux Saga)
sagaMiddleware.run(rootSaga);

export default store;
