export const resetPoints = () => ({ type: 'POINTS_RESET', payload: [] });
export const updatePoints = arrayOfpoints => ({ type: 'POINTS_UPDATE', payload: arrayOfpoints });
export const startedMovingPoint = () => ({ type: 'POINTS_STARTED_MOVING' });
export const stoppedMovingPoint = () => ({ type: 'POINTS_STOPPED_MOVING' });
