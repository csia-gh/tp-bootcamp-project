import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/User';
import { getUsers } from '../services/dataService';

export const fetchUsersData = (searchTerm?: string) => {
  return async (dispatch: Dispatch) => {
    const users = await getUsers(searchTerm);

    dispatch(usersActions.replaceUsers(users));
  };
};

interface UsersSliceState {
  items: IUser[];
};

const initialState: UsersSliceState = {
  items: []
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    replaceUsers(state, action: PayloadAction<IUser[]>) {
      state.items = action.payload;
    },
  }
});

export const usersActions = usersSlice.actions;

export default usersSlice;
