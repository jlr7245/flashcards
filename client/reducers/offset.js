const offset = (state = { offset: 0 }, action) => {
  switch(action.type) {
    case 'SET_OFFSET':
      return { offset: action.offset }
    default:
      return state
  }
}

export default offset
