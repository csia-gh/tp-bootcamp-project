import { createSlice } from '@reduxjs/toolkit';

interface UiSliceState {
  isSidebarOpen: boolean;
};

const initialState: UiSliceState = {
  isSidebarOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    close(state) {
      state.isSidebarOpen = false;
    },
    open(state) {
      state.isSidebarOpen = true;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
