import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { IRepository } from '../models/Repository';
import { getRepositories, getReposOfAUser } from '../services/dataService';
import { RootState } from './store';

export const fetchRepositoryData = (searchTerm?: string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch) => {
    const repositories = await getRepositories(searchTerm);
    dispatch(repositoryActions.replaceRepositories(repositories));
  };
};

export const fetchRepositoriesOfAUser = (name: string) => {
  return async (dispatch: Dispatch) => {
    const repositories = await getReposOfAUser(name);
    dispatch(repositoryActions.replaceRepositories(repositories));
  };
};

interface RepositoriesSliceState {
  items: IRepository[];
};

const initialState: RepositoriesSliceState = {
  items: []
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    replaceRepositories(state, action: PayloadAction<IRepository[]>) {
      state.items = action.payload;
    },
  }
});

export const repositoryActions = repositorySlice.actions;

export default repositorySlice;
