import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    selectedDeliveryId: null,
    activeTripId: null,
    rejectionData: {
        deliveryId: null,
        reason: '',
        attachment: null,
    },
};

const deliverySlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {
        setDeliveryItems: (state, action) => {
            state.items = action.payload;
        },
        selectDelivery: (state, action) => {
            state.selectedDeliveryId = action.payload;
        },
        startDelivery: (state, action) => {
            const delivery = state.items.find(item => item.id === action.payload);
            if (delivery) {
                delivery.status = 'In Progress';
            }
        },
        rejectDelivery: (state, action) => {
            const { deliveryId, reason, attachment } = action.payload;
            const delivery = state.items.find(item => item.id === deliveryId);
            if (delivery) {
                delivery.status = 'Cancelled';
            }
            state.rejectionData = {
                deliveryId: null,
                reason: '',
                attachment: null,
            };
        },
        setRejectionData: (state, action) => {
            state.rejectionData = {
                ...state.rejectionData,
                ...action.payload,
            };
        },
        clearRejectionData: (state) => {
            state.rejectionData = {
                deliveryId: null,
                reason: '',
                attachment: null,
            };
        },
        setActiveTrip: (state, action) => {
            state.activeTripId = action.payload;
        },
    },
});

export const {
    setDeliveryItems,
    selectDelivery,
    startDelivery,
    rejectDelivery,
    setRejectionData,
    clearRejectionData,
    setActiveTrip,
} = deliverySlice.actions;

export default deliverySlice.reducer;
