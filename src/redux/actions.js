export const incRowCount = (content) => ({
  type: 'INCREASE_ROW_COUNT',
  payload: content
})

export const incSemesterCount = (content) => ({
  type: 'INCREASE_SEMESTER_COUNT',
  payload: content
})

export const setGPA = (content) => ({
  type: 'SET_GPA',
  payload: content
})

export const setSemesterLoad = (content) => ({
  type: 'SET_SEMESTER_LOAD',
  payload: content
})

export const setSemesterLoadError = (content) => ({
  type: 'SET_SEMESTER_LOAD_ERROR',
  payload: content
})

export const toggleSemesters = (content) => ({
  type: 'TOGGLE_SEMESTERS',
  payload: content
})

export const toggleSettings = (content) => ({
  type: 'TOGGLE_SETTINGS',
  payload: content
});

