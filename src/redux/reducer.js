const initialState = {
  gpa: '',
  semesterLoad: 5,
  settings: false,
  showSemesters: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GPA' :
      return { ...state, gpa: action.payload }
    case 'SET_SEMESTER_LOAD' :
      return { ...state, semesterLoad: action.payload }
    case 'TOGGLE_SEMESTERS' :
      return { ...state, showSemesters: action.payload }
    case 'TOGGLE_SETTINGS' :
      return { ...state, settings: action.payload };
    default: return state;
  }
}

export default reducer;