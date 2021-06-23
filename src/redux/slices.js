import { createSlice } from '@reduxjs/toolkit';

export const rowCount = createSlice({
  name: 'row-counter',
  initialState: {
    rowCount: 0,
  },
  reducers: {
    incRowCount: (state, action) => {
      state.value = action.payload  
    }
  }
})

export const { incRowCount } = rowCount.actions;

export default rowCount.reducer;