import { createSlice } from '@reduxjs/toolkit'

export const gradesSlice = createSlice({
  name: 'grades',
  initialState: {
    value: {row0: ''}
  },
  reducers: {
    updateGrades: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { updateGrades } = gradesSlice.actions;
export const selectGrades = (state) => state.grades.value;
export default gradesSlice.reducer;