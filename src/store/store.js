// import { configureStore } from '@reduxjs/toolkit';
// import { deliveryReducer, mapReducer } from './reducers';

// const rootReducer = {
//     deliveries: deliveryReducer,
//     map: mapReducer,
// };

// export const store = configureStore({
//     reducer: rootReducer,
// });

import { configureStore } from '@reduxjs/toolkit';
import deliveryReducer from './deliverySlice';
import mapReducer from './mapSlice';

export const store = configureStore({
    reducer: {
        deliveries: deliveryReducer,
        map: mapReducer,
    },
});
