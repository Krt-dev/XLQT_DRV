import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: null,
    currentRouteIndex: null,
    steps: [],
    railColor: '#D3D3D3',
    isRouteActive: false,
    isSwipeButtonVisible: false,
    hasSwipedOnce: false,
};

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setCurrentRouteIndex: (state, action) => {
            state.currentRouteIndex = action.payload;
        },
        setSteps: (state, action) => {
            state.steps = action.payload;
        },
        resetSlider: (state) => {
            return {
                ...initialState,
            };
        },
        updateRailColor: (state, action) => {
            state.railColor = action.payload;
        },
        setIsRouteActive: (state, action) => {
            state.isRouteActive = action.payload;
        },
        setIsSwipeButtonVisible: (state, action) => {
            state.isSwipeButtonVisible = action.payload;
        },
        setHasSwipedOnce: (state, action) => {
            state.hasSwipedOnce = action.payload;
        },
    },
});

export const {
    setCurrentStep,
    setCurrentRouteIndex,
    setSteps,
    resetSlider,
    updateRailColor,
    setIsRouteActive,
    setIsSwipeButtonVisible, // Export the new action
    setHasSwipedOnce, // Export the new action
} = sliderSlice.actions;

export const selectSliderState = (state) => state.slider;

export default sliderSlice.reducer;
