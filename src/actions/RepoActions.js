export const FETCH_REPOSITORIES = 'FETCH_REPOSITORIES';
export const FETCH_REPOSITORIES_SUCCESS = 'FETCH_REPOSITORIES_SUCCESS';
export const FETCH_REPOSITORIES_FAILURE = 'FETCH_REPOSITORIES_FAILURE';

export const fetchRepositories = () => ({
  type: FETCH_REPOSITORIES,
});

export const fetchRepositoriesSuccess = (repositories) => ({
  type: FETCH_REPOSITORIES_SUCCESS,
  payload: repositories,
});

export const fetchRepositoriesFailure = (error) => ({
  type: FETCH_REPOSITORIES_FAILURE,
  payload: error,
});
