/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RejectModal from './RejectModal';
import DetailsModal from './DetailsModal';
import { useNavigation } from '@react-navigation/native';
import {
    setRejectionData,
    rejectDelivery,
    startDelivery,
    clearRejectionData,
    selectDelivery,
    setIsDeliveryStarting,
    setModalContext,
    clearModalContext,
} from './../../store/deliverySlice';
import { useSelector, useDispatch } from 'react-redux';


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const Card = ({ item, onStartTrip, onReject }) => {
    const dispatch = useDispatch();
    // const selectedDeliveryId = useSelector(state => state.deliveries.selectedDeliveryId);
    // const modalContext = useSelector(state => state.deliveries.modalContext);

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    dispatch(selectDelivery(item.id));
                    dispatch(setModalContext('card'));
                }} activeOpacity={0.8}
            >
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.storeName}>{item.store}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="calendar" size={13} color="#A6A6A6" />
                        <Text style={styles.details}>{item.date}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Icon name="map-marker" size={13} color="#A6A6A6" />
                        <Text style={styles.details}>{item.location}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Icon name="clock-outline" size={13} color="#A6A6A6" />
                        <Text style={styles.details}>{item.time}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => onReject(item)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.startButton]}
                            onPress={(event) => {
                                event.stopPropagation();
                                dispatch(startDelivery(item.id));
                                dispatch(setIsDeliveryStarting(true));
                                dispatch(selectDelivery(null));
                                onStartTrip(item);
                                dispatch(clearModalContext());
                            }}
                        >
                            <Text style={styles.buttonText}>Start Trip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            <DetailsModal
                // visible={selectedDeliveryId === item.id && modalContext === 'card'}
                item={item}
                onClose={() => dispatch(selectDelivery(null))}
            />
        </>
    );
};

const TaskSlider = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deliveryItems = useSelector(state => state.deliveries.items);
    const rejectionData = useSelector(state => state.deliveries.rejectionData);

    console.log('TaskSlider deliveryItems:', deliveryItems);

    const handleReject = (item) => {
        console.log('Reject button pressed for:', item);
        dispatch(setRejectionData({ deliveryId: item.id }));
    };

    const handleStartTrip = (item) => {
        console.log('Start Trip button pressed for:', item);
        dispatch(setIsDeliveryStarting(false));
        dispatch(selectDelivery(item.id));
        navigation.navigate('ProcessScreen');
    };

    const submitRejection = () => {
        if (!rejectionData) { return; }

        dispatch(rejectDelivery({
            deliveryId: rejectionData.deliveryId,
            reason: rejectionData.reason,
            attachment: rejectionData.attachment,
        }));
        dispatch(clearRejectionData());
    };

    if (!deliveryItems || deliveryItems.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>No delivery items available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToInterval={CARD_WIDTH + 20}
                decelerationRate="fast"
                style={styles.scrollView}
            >
                {deliveryItems.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        onStartTrip={() => handleStartTrip(item)}
                        onReject={() => handleReject(item)}
                    />
                ))}
            </ScrollView>

            <RejectModal
                visible={!!rejectionData?.deliveryId}
                onClose={() => dispatch(clearRejectionData())}
                onSubmit={submitRejection}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: -20,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        height: 210,
        paddingBottom: 20,
        flex: 1,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        height: 410,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 13,
        color: '#A6A6A6',
        marginLeft: 5,
        flex: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    buttonContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 1,
    },
    button: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    startButton: {
        backgroundColor: '#1ABDD4',
        marginLeft: 8,
    },
    rejectButton: {
        backgroundColor: '#72D6E4',
        marginRight: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },

});

export default TaskSlider;
