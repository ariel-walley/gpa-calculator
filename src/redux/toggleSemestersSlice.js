import { createSlice } from '@reduxjs/toolkit'

export const toggleSemestersSlice = createSlice({
  name: 'showSemesters',
  initialState: {
    value: {row0: ''}
  },
  reducers: {
    toggleSemesters: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { toggleSemesters } = toggleSemestersSlice.actions;
export const selectShowSemesters = (state) => state.showSemesters.value;
export default toggleSemestersSlice.reducer;