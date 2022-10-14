import { createSlice } from '@reduxjs/toolkit';
import { getRepositories } from '../services/dataService';

export const fetchRepositoryData = (searchTerm) => {
  return async (dispatch) => {
    const repositories = await getRepositories(searchTerm);

    dispatch(repositoryActions.replaceRepositories(repositories));
  };
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState: { items: [] },
  reducers: {
    replaceRepositories(state, action) {
      state.items = action.payload;
    },
  }
});

export const repositoryActions = repositorySlice.actions;

export default repositorySlice;
