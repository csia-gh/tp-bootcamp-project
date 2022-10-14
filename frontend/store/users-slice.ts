import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../services/dataService';

export const fetchUsersData = () => {
  return async (dispatch) => {
    const users = await getUsers();

    dispatch(usersActions.replaceUsers(users));
  };
};

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [] },
  reducers: {
    replaceUsers(state, action) {
      state.items = action.payload;
    },
  }
});

export const usersActions = usersSlice.actions;

export default usersSlice;
