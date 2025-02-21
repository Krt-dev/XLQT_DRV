import { configureStore } from '@reduxjs/toolkit';
import deliveryReducer from './deliverySlice';
import mapReducer from './mapSlice';
import sliderReducer from './sliderSlice';

export const store = configureStore({
    reducer: {
        deliveries: deliveryReducer,
        map: mapReducer,
        slider: sliderReducer,
    },
});
