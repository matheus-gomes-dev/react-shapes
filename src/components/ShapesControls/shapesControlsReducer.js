const INITIAL_STATE = { mode: 'move' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}
