import { createSlice } from '@reduxjs/toolkit';

interface UiSliceState {
  isOpen: boolean;
};

const initialState: UiSliceState = {
  isOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    close(state) {
      state.isOpen = false;
    },
    open(state) {
      state.isOpen = true;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
