import { createStore, combineReducers } from 'redux';
import pointsReducer from './components/Points/pointsReducer';
import shapesControlsReducer from './components/ShapesControls/shapesControlsReducer';

const rootReducer = combineReducers({
  selectedPoints: pointsReducer,
  shapesControlMode: shapesControlsReducer,
});

export default createStore(rootReducer);
