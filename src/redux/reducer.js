const initialState = {
  settings: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS' :
      return { ...state, settings: action.payload };
    default: return state;
  }
}

export default reducer;