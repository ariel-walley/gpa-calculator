import { configureStore } from '@reduxjs/toolkit';
import rowCountReducer from './slices';

export default configureStore({
  reducer: {
    rowCount: rowCountReducer,
  },
})

