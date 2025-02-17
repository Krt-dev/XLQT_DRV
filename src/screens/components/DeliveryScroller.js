/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DELIVERY_ITEMS } from '../constants/dataDelivery';

export default function DeliveryScroller() {
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
            showsVerticalScrollIndicator={false}
            style={styles.sliderContainer}
        >
            {DELIVERY_ITEMS.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.deliveryCard}
                    onPress={() => console.log('Delivery card pressed:', item.id)}
                >
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="truck-fast-outline" size={30} color="#1882A1" />
                            <Text style={{ fontFamily: 'LexendDeca-SemiBold', marginLeft: 8 }}>
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
    },
    deliveryCard: {
        width: 355,
        height: 130,
        backgroundColor: '#DEFBFF',
        borderRadius: 10,
        marginRight: 15,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 10,
        marginTop: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginBottom: 3,
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
        gap: 0,
        marginBottom: 0,
    },
    mainInfoText: {
        fontSize: 12,
        fontFamily: 'Karla-Light',
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
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
});
