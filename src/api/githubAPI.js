import axios from 'axios';

const accessToken = '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';

const githubApi = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const fetchRepositories = async () => {
  try {
    const response = await githubApi.get('/orgs/react-native-community/repos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchRepositories = async (query) => {
  try {
    const response = await githubApi.get(`/search/repositories?q=${query}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
