export function refreshReducer(state = false, action) {
  switch (action.type) {
    case 'switch':
      return !state;
    default:
      return state;
  }
}
