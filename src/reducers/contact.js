const initialState = {
  contact: [],
}

const reducer = (state = initialState, action) => {
  if (action.type === 'LOAD_CONTACT') {
    return {
      ...state,
      contact: action.contact,
    }
  }
  return state
}

export default reducer
