import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import usersSlice from './users-slice';
import repositorySlice from './repository-slice';
import contributionsSlice from './contributions-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    users: usersSlice.reducer,
    repository: repositorySlice.reducer,
    contributions: contributionsSlice.reducer,
  },
});

export default store;
