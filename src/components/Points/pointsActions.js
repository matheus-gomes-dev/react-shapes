export const resetPoints = () => ({ type: 'POINTS_RESET', payload: [] });
export const updatePoints = arrayOfpoints => ({ type: 'POINTS_UPDATE', payload: arrayOfpoints });
export const startedMovingPoint = pointInfo => ({ type: 'POINTS_STARTED_MOVING', payload: pointInfo });
export const stoppedMovingPoint = () => ({ type: 'POINTS_STOPPED_MOVING' });
