import { TYPES } from '../store/type';


const initialDeliveryState = {
    items: [],
    selectedDeliveryId: null,
    rejectionData: {
        deliveryId: null,
        reason: '',
        attachment: null,
    },
};

const initialMapState = {
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

export const deliveryReducer = (state = initialDeliveryState, action) => {
    switch (action.type) {
        case TYPES.SET_DELIVERY_ITEMS:
            return {
                ...state,
                items: action.payload,
            };

        case TYPES.SELECT_DELIVERY:
            return {
                ...state,
                selectedDeliveryId: action.payload,
            };

        case TYPES.START_DELIVERY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload
                        ? { ...item, status: 'In Progress' }
                        : item
                ),
            };

        case TYPES.REJECT_DELIVERY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.deliveryId
                        ? { ...item, status: 'Cancelled' }
                        : item
                ),
                rejectionData: initialDeliveryState.rejectionData,
            };

        case TYPES.SET_REJECTION_DATA:
            return {
                ...state,
                rejectionData: {
                    ...state.rejectionData,
                    ...action.payload,
                },
            };

        case TYPES.CLEAR_REJECTION_DATA:
            return {
                ...state,
                rejectionData: initialDeliveryState.rejectionData,
            };

        default:
            return state;
    }
};

export const mapReducer = (state = initialMapState, action) => {
    switch (action.type) {
        case TYPES.SET_ZOOM_LEVEL:
            return {
                ...state,
                zoomLevel: action.payload,
            };

        case TYPES.UPDATE_REGION:
            return {
                ...state,
                region: action.payload,
            };

        case TYPES.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };

        case TYPES.SET_SELECTED_MARKER:
            return {
                ...state,
                selectedMarkerId: action.payload,
            };

        default:
            return state;
    }
};
