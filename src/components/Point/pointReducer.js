const INITIAL_STATE = { points: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'POINTS_RESET':
      return INITIAL_STATE;
    case 'POINTS_UPDATE':
      return { points: action.payload };
    default:
      return state;
  }
}
