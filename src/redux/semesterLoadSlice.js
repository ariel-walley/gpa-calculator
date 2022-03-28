import { createSlice } from '@reduxjs/toolkit'

export const semesterLoadSlice = createSlice({
  name: 'semesterLoad',
  initialState: {
    value: 5
  },
  reducers: {
    updateSemesterLoad: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { updateSemesterLoad } = semesterLoadSlice.actions;
export const selectSemesterLoad = (state) => state.semesterLoad.value;
export default semesterLoadSlice.reducer;