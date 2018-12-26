import { createStore, combineReducers } from 'redux';
import pointsReducer from './components/Points/pointsReducer';

const rootReducer = combineReducers({
  selectedPoints: pointsReducer,
});

export default createStore(rootReducer);
