import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { deliveryActions } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import DetailsModal from './DetailsModal';


const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

// const Card = ({ item, onStartTrip, onReject }) => {
//     return (
//         <View style={styles.card}>
//             <View style={styles.cardHeader}>
//                 <Text style={styles.storeName}>{item.store}</Text>
//             </View>

//             <View style={styles.infoRow}>
//                 <Icon name="calendar" size={13} color="#A6A6A6" />
//                 <Text style={styles.details}>{item.date}</Text>
//             </View>
//             <View style={styles.infoRow}>
//                 <Icon name="map-marker" size={13} color="#A6A6A6" />
//                 <Text style={styles.details}>{item.location}</Text>
//             </View>
//             <View style={styles.infoRow}>
//                 <Icon name="clock-outline" size={13} color="#A6A6A6" />
//                 <Text style={styles.details}>{item.time}</Text>
//             </View>

//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => onReject(item)}>
//                     <Text style={styles.buttonText}>Reject</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.button, styles.startButton]} onPress={() => onStartTrip(item)}>
//                     <Text style={styles.buttonText}>Start Trip</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

const Card = ({ item, onStartTrip, onReject }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.8}>
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
                        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={() => onReject(item)}>
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={() => onStartTrip(item)}>
                            <Text style={styles.buttonText}>Start Trip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>

            <DetailsModal visible={modalVisible} item={item} onClose={() => setModalVisible(false)} />
        </>
    );
};

const TaskSlider = ({ deliveryItems }) => {
    const dispatch = useDispatch();
    const { rejectionData } = useSelector(state => state.deliveries);
    const navigation = useNavigation();


    const handleReject = (item) => {
        console.log('Reject button pressed for:', item);
        dispatch(deliveryActions.setRejectionData({ deliveryId: item.id }));
    };

    const handleStartTrip = (item) => {
        console.log('Start Trip button pressed for:', item);
        dispatch(deliveryActions.startDelivery({ deliveryId: item.id }));
        navigation.navigate('Home', { screen: 'ProcessScreen', params: { itemId: item.id } });
    };

    const submitRejection = () => {
        console.log('Rejection reason:', rejectionData?.reason);
        console.log('Rejected item:', rejectionData?.deliveryId);
        dispatch(deliveryActions.rejectDelivery(
            rejectionData.deliveryId,
            rejectionData.reason,
            rejectionData.attachment
        ));
        dispatch(deliveryActions.clearRejectionData());
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToInterval={CARD_WIDTH + 20}
                decelerationRate="fast"
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
                visible={!!rejectionData.deliveryId}
                onClose={() => dispatch(deliveryActions.clearRejectionData())}
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
