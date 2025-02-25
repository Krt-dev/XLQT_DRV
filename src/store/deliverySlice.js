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
    process: {
        expandedSections: {},
        completedSteps: {},
        currentRoute: null,
        actionStatus: {},
    },
    isDeliveryStarting: false,
    modalContext: null,

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
        toggleSection: (state, action) => {
            const sectionIndex = action.payload;
            state.process.expandedSections[sectionIndex] =
                !state.process.expandedSections[sectionIndex];
        },
        setCurrentRoute: (state, action) => {
            state.process.currentRoute = action.payload;
        },
        completeActionStep: (state, action) => {
            const { routeIndex, stepIndex } = action.payload;
            if (!state.process.completedSteps[routeIndex]) {
                state.process.completedSteps[routeIndex] = {};
            }
            state.process.completedSteps[routeIndex][stepIndex] = true;
        },
        updateActionStatus: (state, action) => {
            const { routeIndex, status } = action.payload;
            state.process.actionStatus[routeIndex] = status;
        },
        resetProcessState: (state) => {
            state.process = initialState.process;
        },
        setIsDeliveryStarting: (state, action) => {
            state.isDeliveryStarting = action.payload;
        },
        setModalContext: (state, action) => {
            state.modalContext = action.payload;
        },
        clearModalContext: (state) => {
            state.modalContext = null;
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
    toggleSection,
    setCurrentRoute,
    completeActionStep,
    updateActionStatus,
    resetProcessState,
    setIsDeliveryStarting,
    setModalContext,
    clearModalContext,
} = deliverySlice.actions;

export const selectCurrentDelivery = (state) =>
    state.deliveries.items.find(item => item.id === state.deliveries.selectedDeliveryId);

export const selectExpandedSections = (state) =>
    state.deliveries.process.expandedSections;

export const selectCompletedSteps = (state) =>
    state.deliveries.process.completedSteps;

export const selectActionStatus = (state) =>
    state.deliveries.process.actionStatus;

export default deliverySlice.reducer;
