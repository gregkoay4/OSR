import { FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_FAILURE } from '../actions/RepoActions';

const initialState = {
  repositories: [],
  error: null,
};

const RepoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_SUCCESS:
      return { ...state, repositories: action.payload, error: null };
    case FETCH_REPOSITORIES_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default RepoReducer;
