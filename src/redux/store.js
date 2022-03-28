import { configureStore } from '@reduxjs/toolkit';

import GPAReducer from '../redux/gpaSlice';
import GradesReducer from '../redux/gradesSlice';
import SemesterLoadReducer from '../redux/semesterLoadSlice';
import SemestersReducer from '../redux/semestersSlice';
import ToggleSemesterReducer from '../redux/toggleSemestersSlice';

export default configureStore({
  reducer: {
    gpa: GPAReducer,
    grades: GradesReducer,
    semesterLoad: SemesterLoadReducer,
    semesters: SemestersReducer,
    showSemesters: ToggleSemesterReducer
  },
});