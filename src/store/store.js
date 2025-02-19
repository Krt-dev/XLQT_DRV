import { configureStore } from '@reduxjs/toolkit';
import { deliveryReducer, mapReducer } from './reducers';

const rootReducer = {
    deliveries: deliveryReducer,
    map: mapReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
