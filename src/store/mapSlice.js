// mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    zoomLevel: 0.015,
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015 * (16 / 9),
    },
    searchQuery: '',
    selectedMarkerId: null,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setZoomLevel: (state, action) => {
            state.zoomLevel = action.payload;
        },
        updateRegion: (state, action) => {
            state.region = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedMarker: (state, action) => {
            state.selectedMarkerId = action.payload;
        },
    },
});

export const {
    setZoomLevel,
    updateRegion,
    setSearchQuery,
    setSelectedMarker,
} = mapSlice.actions;

export default mapSlice.reducer;
