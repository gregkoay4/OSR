// sagas.js
import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_REPOSITORIES, fetchRepositoriesSuccess, fetchRepositoriesError } from '../actions/RepoActions'; // Import your Redux action types and action creators
import api from '../api/githubAPI'; // Import your API functions

// Define your saga function to fetch repositories
function* fetchRepositoriesSaga(action) {
  try {
    // Call your API function to fetch repositories (replace with your actual API call)
    const data = yield call(api.fetchRepositories);

    // Dispatch a success action with the data
    yield put(fetchRepositoriesSuccess(data));
  } catch (error) {
    // Dispatch an error action in case of an error
    yield put(fetchRepositoriesError(error));
  }
}

// Watch for the FETCH_REPOSITORIES action and run the saga
function* watchFetchRepositories() {
  yield takeLatest(FETCH_REPOSITORIES, fetchRepositoriesSaga);
}

// Export the root saga
export default function* rootSaga() {
  yield watchFetchRepositories(); // You can add more watchers for other actions if needed
}
