const keywords = (state = {}, action) => {
  console.log(action);
  switch(action.type) {
    case 'SET_CURRENT_KEYWORDS':
      return ({
        ...state,
        currentKeywords: action.keywords,
      });
    case 'SET_ALL_KEYWORDS':
      return ({
        ...state,
        allKeywords: action.keywords,
      });
    default:
      return state;
  }
}

export default keywords;
