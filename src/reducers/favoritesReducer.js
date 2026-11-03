
function favoritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      if (state.includes(action.photoId)) {
        return state.filter((id) => id !== action.photoId);
      }

      return [...state, action.photoId];

    default:
      return state;
  }
}

export default favoritesReducer;
