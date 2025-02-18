import { createStore, combineReducers } from 'redux';
import { deliveryReducer, mapReducer } from './reducers';

const rootReducer = combineReducers({
    deliveries: deliveryReducer,
    map: mapReducer,
});

export const store = createStore(rootReducer);
