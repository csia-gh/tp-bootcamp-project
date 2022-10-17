import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { getContributors } from '../services/dataService';

import { IUser } from '../models/User';

interface ContributorsSliceState {
  items: IUser[];
};

const initialState: ContributorsSliceState = {
  items: []
};

const contributorsSlice = createSlice({
  name: 'contributors',
  initialState,
  reducers: {
    replaceContributors(state, action: PayloadAction<IUser[]>) {
      state.items = action.payload;
    },
  }
});

export const fetchContributorsData = (repoId: number) => {
  return async (dispatch: Dispatch) => {
    const contributors = await getContributors(repoId);
    dispatch(contributorsActions.replaceContributors(contributors));
  };
};

export const contributorsActions = contributorsSlice.actions;

export default contributorsSlice;
