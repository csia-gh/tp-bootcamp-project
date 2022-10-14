import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isOpen: false },
  reducers: {
    close(state) {
      state.isOpen = false
    },
    open(state) {
      state.isOpen = true
    }
  },
})

export const uiActions = uiSlice.actions

export default uiSlice
