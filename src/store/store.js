import { configureStore } from '@reduxjs/toolkit';
import deliveryReducer from './deliverySlice';
import mapReducer from './mapSlice';

export const store = configureStore({
    reducer: {
        deliveries: deliveryReducer,
        map: mapReducer,
    },
});
