const initialState = {
  allThanks: []
}

const reducer = (state = initialState, action) => {
  if (action.type === 'LOAD_THANKS') {
    return {
      ...state,
      allThanks: action.thanks
    }
  }
  return state
}

export default reducer
