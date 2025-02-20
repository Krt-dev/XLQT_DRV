/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DELIVERY_ITEMS } from '../constants/dataDelivery';

export default function DeliverySlider() {
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

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sliderContainer}
        >
            {DELIVERY_ITEMS.slice(0, 1).map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.deliveryCard}
                    onPress={() => console.log('Delivery card pressed:', item.id)}
                >
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="truck-fast-outline" size={30} color="#1882A1" />
                            <Text style={styles.storeNameText}>
                                {item.store}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[
                                styles.statusIndicator,
                                { backgroundColor: getStatusColor(item.status) },
                            ]} />
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                    </View>
                    <View style={styles.cardContent}>
                        <View style={styles.mainInfoRow}>
                            <Icon name="map-marker" size={16} color="#0CC2DC" />
                            <Text style={styles.mainInfoText}>{item.location}</Text>
                        </View>
                        <View style={styles.mainInfoRow}>
                            <Icon name="calendar-month" size={16} color="#0CC2DC" />
                            <Text style={styles.mainInfoText}>{item.date}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <View style={styles.timeContainer}>
                                <Icon name="clock-outline" size={14} color="#666" />
                                <Text style={styles.timeText}>{item.time}</Text>
                            </View>
                            <View style={styles.itemsContainer}>
                                <Icon name="routes" size={14} color="#666" />
                                <Text style={styles.itemsText}>{item.routes} routes</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        paddingHorizontal: 15,
        height: 155,
        alignContent: 'center',
    },
    deliveryCard: {
        width: 340,
        height: 140,
        backgroundColor: '#DEFBFF',
        borderRadius: 10,
        marginRight: 15,
        marginTop: 5,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        flex: 1,
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
});
