import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import usersSlice from './users-slice';
import repositoriesSlice from './repositories-slice';
import contributorsSlice from './contributors-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    users: usersSlice.reducer,
    repositories: repositoriesSlice.reducer,
    contributors: contributorsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectUsers = (state: RootState) => state.users.items;
export const selectRepositories = (state: RootState) => state.repositories.items;
export const selectContributors = (state: RootState) => state.contributors.items;
export const selectIsSidebarOpen = (state: RootState) => state.ui.isSidebarOpen;

export default store;
