const INITIAL_STATE = { points: [], moving: { status: false, targetPointIndex: null } };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'POINTS_RESET':
      return INITIAL_STATE;
    case 'POINTS_UPDATE':
      return { ...state, points: action.payload };
    case 'POINTS_STARTED_MOVING':
      return { ...state, moving: action.payload };
    case 'POINTS_STOPPED_MOVING':
      return { ...state, moving: { status: false, targetPointIndex: null } };
    default:
      return state;
  }
}
