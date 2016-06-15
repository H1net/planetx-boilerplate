export default function visibilityFilter(state = 'CLOSED', action = {}) {
  switch (action.type) {
    case 'SET_ICON_MENU':
      return action.filter;
    default:
      return state;
  }
}
