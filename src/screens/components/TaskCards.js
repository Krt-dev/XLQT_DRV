/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DELIVERY_ITEMS } from '../constants/dataDelivery';

export default function TaskCards() {
    const getStatusColor = (status) => {
        switch (status) {
            case 'New':
                return '#FF6565';
            case 'In Progress':
                return '#FEB267';
            case 'Completed':
                return '#67FE87';
            default:
                return '#000000';
        }
    };

    // Get the first delivery item
    const currentItem = DELIVERY_ITEMS[0];

    if (!currentItem) {
        return <Text style={styles.noDataText}>No deliveries available</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.deliveryCard}
                onPress={() => console.log('Delivery card pressed:', currentItem.id)}
            >
                <View style={styles.cardHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="truck-fast-outline" size={30} color="#1882A1" />
                        <Text style={styles.storeNameText}>
                            {currentItem.store}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[
                            styles.statusIndicator,
                            { backgroundColor: getStatusColor(currentItem.status) },
                        ]} />
                        <Text style={styles.statusText}>{currentItem.status}</Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <View style={styles.mainInfoRow}>
                        <Icon name="map-marker" size={16} color="#0CC2DC" />
                        <Text style={styles.mainInfoText}>{currentItem.location}</Text>
                    </View>
                    <View style={styles.mainInfoRow}>
                        <Icon name="calendar-month" size={16} color="#0CC2DC" />
                        <Text style={styles.mainInfoText}>{currentItem.date}</Text>
                    </View>
                    <View style={styles.mainInfoRow}>
                        <Text style={styles.itemsText}>Next Route:</Text>
                        <Text style={styles.mainInfoText}> {currentItem.nextRoute}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.timeContainer}>
                            <Icon name="clock-outline" size={14} color="#666" />
                            <Text style={styles.timeText}>{currentItem.time}</Text>
                        </View>
                        <View style={styles.itemsContainer}>
                            <Icon name="routes" size={14} color="#666" />
                            <Text style={styles.itemsText}>{currentItem.routes} routes</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'center', // Centers the card vertically
        alignItems: 'center', // Centers the card horizontally
    },
    deliveryCard: {
        backgroundColor: '#DEFBFF',
        borderRadius: 10,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        flex: 1,
        width: '100%',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 13,
        marginBottom: 1,
        marginRight: 3,
    },
    statusIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Karla-Bold',
        color: '#333',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    mainInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 50,
        gap: 1,
        marginBottom: 4,
    },
    mainInfoText: {
        fontSize: 12,
        fontFamily: 'Karla-Light',
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'Karla-Regular',
        color: '#666',
        marginLeft: 4,
    },
    itemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemsText: {
        fontSize: 12,
        fontFamily: 'Karla-Regular',
        color: '#666',
        marginLeft: 4,
    },
    storeNameText: {
        fontFamily: 'LexendDeca-SemiBold',
        marginLeft: 8,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
});
