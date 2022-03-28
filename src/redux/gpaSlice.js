import { createSlice } from '@reduxjs/toolkit'

export const GPASlice = createSlice({
  name: 'gpa',
  initialState: {
    value: ''
  },
  reducers: {
    updateGPA: (state, action) => {
      state.value = action.payload
    }
  }
})

export const {updateGPA} = GPASlice.actions;
export const selectGPA = (state) => state.gpa.value;
export default GPASlice.reducer;