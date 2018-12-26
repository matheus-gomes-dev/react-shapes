import { createStore, combineReducers } from 'redux';
import pointsReducer from './components/Point/pointReducer';

const rootReducer = combineReducers({
  selectedPoints: pointsReducer,
});

export default createStore(rootReducer);
