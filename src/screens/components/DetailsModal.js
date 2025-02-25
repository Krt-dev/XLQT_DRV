import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { selectDelivery, clearModalContext } from './../../store/deliverySlice';

const DetailsModal = ({ item }) => { // Remove visible and onClose props
    const dispatch = useDispatch();
    const selectedDeliveryId = useSelector(state => state.deliveries.selectedDeliveryId); // Get selectedDeliveryId from Redux
    const modalContext = useSelector(state => state.deliveries.modalContext); // Get modalContext from Redux

    if (!item) { return null; }

    // Conditionally render the modal based on selectedDeliveryId and modalContext
    const isVisible = selectedDeliveryId === item.id && modalContext === 'card';

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
                dispatch(selectDelivery(null));
                dispatch(clearModalContext());
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            dispatch(selectDelivery(null));
                            dispatch(clearModalContext());
                        }}
                    >
                        <MaterialCommunityIcons name="close" size={22} color="#666" />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.modalTitle}>{item.store}</Text>

                        <View style={styles.infoBlock}>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="calendar" size={16} color="#666" />
                                <Text style={styles.modalText}>{item.date}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                                <Text style={styles.modalText}>{item.location}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                                <Text style={styles.modalText}>{item.time}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="routes" size={16} color="#666" />
                                <Text style={styles.modalText}>{item.routes} Routes</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.infoBlock}>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="truck-outline" size={16} color="#666" />
                                <Text style={styles.modalText}>Body Number: {item.bodyNumber}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="account-tie" size={16} color="#666" />
                                <Text style={styles.modalText}>Driver: {item.driver}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <MaterialCommunityIcons name="car" size={16} color="#666" />
                                <Text style={styles.modalText}>Plate Number: {item.plateNumber}</Text>
                            </View>
                            <View style={styles.routesSeparator}>
                                <View style={styles.separator} />
                                <Text style={styles.routesText}>Routes</Text>
                                <View style={styles.separator} />
                            </View>
                            {item.nextRoute.map((route, index) => (
                                <View key={index} style={styles.routeItem}>
                                    <View style={styles.iconWithNumber}>
                                        <MaterialCommunityIcons name="circle" size={24} color="#72D6E4" />
                                        <Text style={styles.numberOverlay}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.routeDetails}>
                                        <Text style={styles.routeType}>{route.serviceType}</Text>
                                        <Text style={styles.routePlace}>{route.place}</Text>
                                        <Text style={styles.routeTime}>Expected Arrival time: {route.expectedTimeArrival}</Text>
                                        <Text style={styles.routeTime}>Expected Departure time: {route.expectedTimeDeparture}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 350,
        backgroundColor: 'white',
        padding: 0,
        overflow: 'hidden',
        borderRadius: 5,
        maxHeight: '80%',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        zIndex: 1,
    },
    scrollContainer: {
        alignItems: 'flex-start',
        width: '100%',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'LexendDeca-SemiBold',
        textAlign: 'left',
    },
    modalText: {
        fontSize: 12,
        fontFamily: 'Karla-Light',
        textAlign: 'left',
        marginLeft: 5,
    },
    infoBlock: {
        width: '100%',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    routesSeparator: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
    },
    routesText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginHorizontal: 5,
    },
    routeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconWithNumber: {
        position: 'relative',
        marginRight: 10,
        marginBottom: 30,
    },
    numberOverlay: {
        position: 'absolute',
        top: 2,
        left: 8,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    routeDetails: {
        flex: 1,
        marginBottom: 3,
    },
    routeType: {
        fontSize: 11,
        fontFamily: 'Karla-SemiBold',
        color: '#A6A6A6',
    },
    routePlace: {
        fontSize: 15,
        fontFamily: 'Karla-Bold',
    },
    routeTime: {
        fontSize: 10,
        color: '#A6A6A6',
    },
});


export default DetailsModal;
