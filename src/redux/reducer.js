const initialState = {
  gpa: '',
  rowCount: 0,
  semesterCount: 0,
  semesterLoad: 5,
  semesterLoadError: false,
  settings: false,
  showSemesters: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_ROW_COUNT' :
      return { ...state, rowCount: action.payload }
    case 'INCREASE_SEMESTER_COUNT' :
      return { ...state, semesterCount: action.payload }
    case 'SET_GPA' :
      return { ...state, gpa: action.payload }
    case 'SET_SEMESTER_LOAD' :
      return { ...state, semesterLoad: action.payload }
    case 'SET_SEMESTER_LOAD_ERROR' :
      return { ...state, semesterLoadError: action.payload }
    case 'TOGGLE_SEMESTERS' :
      return { ...state, showSemesters: action.payload }
    case 'TOGGLE_SETTINGS' :
      return { ...state, settings: action.payload };
    default: return state;
  }
}

export default reducer;