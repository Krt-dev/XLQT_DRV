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
    unprocessedTaskData: {
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
    unprocessedTaskModalVisible: false,

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

            const updatedItems = state.items.map(item => {
                if (item.id === deliveryId) {
                    return { ...item, status: 'Cancelled' };
                }
                return item;
            });

            return {
                ...state,
                items: updatedItems,
                rejectionData: {
                    deliveryId: null,
                    reason: '',
                    attachment: null,
                },
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
        markDeliveryAsComplete: (state, action) => {
            const deliveryId = action.payload;
            const delivery = state.items.find(item => item.id === deliveryId);
            if (delivery) {
                delivery.status = 'Completed';
            }
        },
        setUnprocessedTask: (state, action) => {
            state.unprocessedTaskData = {
                ...state.unprocessedTaskData,
                ...action.payload,
            };
        },
        submitUnprocessedTask: (state, action) => {
            // In a real application, you'd likely make an API call here
            // to submit the unprocessed task data to your server.

            // For this example, we'll just clear the data.
            state.unprocessedTaskData = {
                deliveryId: null,
                reason: '',
                attachment: null,
            };
            state.unprocessedTaskModalVisible = false;
        },
        clearUnprocessedTaskData: (state) => {
            state.unprocessedTaskData = {
                deliveryId: null,
                reason: '',
                attachment: null,
            };
        },
        // New reducers for modal visibility
        showUnprocessedTaskModal: (state) => {
            state.unprocessedTaskModalVisible = true;
        },
        hideUnprocessedTaskModal: (state) => {
            state.unprocessedTaskModalVisible = false;
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
    markDeliveryAsComplete,
    setUnprocessedTask,
    submitUnprocessedTask,
    clearUnprocessedTaskData,
    showUnprocessedTaskModal,
    hideUnprocessedTaskModal,
} = deliverySlice.actions;

export const selectCurrentDelivery = (state) =>
    state.deliveries.items.find(item => item.id === state.deliveries.selectedDeliveryId);

export const selectExpandedSections = (state) =>
    state.deliveries.process.expandedSections;

export const selectCompletedSteps = (state) =>
    state.deliveries.process.completedSteps;

export const selectActionStatus = (state) =>
    state.deliveries.process.actionStatus;

// New selector for modal visibility
export const selectUnprocessedTaskModalVisible = (state) =>
    state.deliveries.unprocessedTaskModalVisible;

export default deliverySlice.reducer;
