import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_REPOSITORIES, fetchRepositoriesSuccess, fetchRepositoriesError } from '../actions/RepoActions';
import api from '../api/githubAPI';

function* fetchRepositoriesSaga(action) {
  try {
    const data = yield call(api.fetchRepositories);

    yield put(fetchRepositoriesSuccess(data));
  } catch (error) {
    yield put(fetchRepositoriesError(error));
  }
}

function* watchFetchRepositories() {
  yield takeLatest(FETCH_REPOSITORIES, fetchRepositoriesSaga);
}

export default function* rootSaga() {
  yield watchFetchRepositories();
}
