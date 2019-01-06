export const resetPoints = () => ({ type: 'POINTS_RESET', payload: [] });
export const updatePoints = arrayOfpoints => ({ type: 'POINTS_UPDATE', payload: arrayOfpoints });
export const startedMovingPoint = payload => ({ type: 'POINTS_STARTED_MOVING', payload });
export const stoppedMovingPoint = () => ({ type: 'POINTS_STOPPED_MOVING' });
