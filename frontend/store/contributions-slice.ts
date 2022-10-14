import { createSlice } from '@reduxjs/toolkit';
import { getContributors } from '../services/dataService';

export const fetchContributorsData = (id: number) => {
  return async (dispatch) => {
    const contributors = await getContributors(id);

    dispatch(repositoryActions.replaceContributors(contributors));
  };
};

const contributorsSlice = createSlice({
  name: 'contributors',
  initialState: { items: [] },
  reducers: {
    replaceContributors(state, action) {
      state.items = action.payload;
    },
  }
});

export const repositoryActions = contributorsSlice.actions;

export default contributorsSlice;
