import { createSlice } from '@reduxjs/toolkit'

export const semestersSlice = createSlice({
  name: 'semesters',
  initialState: {
    value: {    
      s0: {
        name: "Semester 1",
        rows: [0],
        input: false
      }
    }
  },
  reducers: {
    updateSemesters: (state, action) => {
      state.value = action.payload
    }
  }
});

export const { updateSemesters } = semestersSlice.actions;
export const selectSemesters = (state) => state.semesters.value;
export default semestersSlice.reducer;