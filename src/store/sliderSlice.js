import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: null,
    currentRouteIndex: null,
    steps: [],
    railColor: '#D3D3D3', // Default color
    isRouteActive: false, // Add isRouteActive state
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
            state.railColor = action.payload; // Update railColor in store
        },
        setIsRouteActive: (state, action) => {
            state.isRouteActive = action.payload; // Update isRouteActive state
        },
    },
});

export const {
    setCurrentStep,
    setCurrentRouteIndex,
    setSteps,
    resetSlider,
    updateRailColor,
    setIsRouteActive, // Export the new action
} = sliderSlice.actions;

export const selectSliderState = (state) => state.slider;

export default sliderSlice.reducer;
