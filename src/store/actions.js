import { TYPES } from '../store/type';

export const deliveryActions = {
    setDeliveryItems: (items) => ({
        type: TYPES.SET_DELIVERY_ITEMS,
        payload: items,
    }),

    selectDelivery: (deliveryId) => ({
        type: TYPES.SELECT_DELIVERY,
        payload: deliveryId,
    }),

    startDelivery: (deliveryId) => ({
        type: TYPES.START_DELIVERY,
        payload: deliveryId,
    }),

    rejectDelivery: (deliveryId, reason, attachment) => ({
        type: TYPES.REJECT_DELIVERY,
        payload: { deliveryId, reason, attachment },
    }),

    setRejectionData: (data) => ({
        type: TYPES.SET_REJECTION_DATA,
        payload: data,
    }),

    clearRejectionData: () => ({
        type: TYPES.CLEAR_REJECTION_DATA,
    }),

    setActiveTrip: (deliveryId) => ({
        type: TYPES.SET_ACTIVE_TRIP,
        payload: deliveryId,
    }),
};

export const mapActions = {
    setZoomLevel: (level) => ({
        type: TYPES.SET_ZOOM_LEVEL,
        payload: level,
    }),

    updateRegion: (region) => ({
        type: TYPES.UPDATE_REGION,
        payload: region,
    }),

    setSearchQuery: (query) => ({
        type: TYPES.SET_SEARCH_QUERY,
        payload: query,
    }),

    setSelectedMarker: (markerId) => ({
        type: TYPES.SET_SELECTED_MARKER,
        payload: markerId,
    }),
};
