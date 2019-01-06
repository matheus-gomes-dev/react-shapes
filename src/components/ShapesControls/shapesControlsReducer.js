const INITIAL_STATE = { mode: 'move', changedMode: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload, changedMode: true };
    case 'RESET_MODE':
      return { ...state, mode: 'move', changedMode: false };
    default:
      return state;
  }
}
