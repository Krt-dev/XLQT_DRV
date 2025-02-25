/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeliveryInfo = ({ deliveryItem }) => {
    return (
        <View style={styles.infoBlock}>
            <View style={styles.infoRow}>
                <MaterialCommunityIcons name="calendar" size={18} color="#666" />
                <Text style={styles.infoText}>{deliveryItem.date}</Text>

                <View style={styles.spacer} />

                <MaterialCommunityIcons name="clock-outline" size={18} color="#666" />
                <Text style={styles.infoText}>{deliveryItem.time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons name="map-marker" size={18} color="#666" />
                <Text style={{ marginLeft: 6, fontSize: 12, fontFamily: 'Karla-Regular', color: '#666' }}>
                    {deliveryItem.location}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoBlock: {
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'flex-start',
    },
    infoText: {
        marginLeft: 6,
        fontSize: 12,
        fontFamily: 'Karla-Regular',
        color: '#666',
    },
    spacer: {
        width: 40,
    },
});

export default DeliveryInfo;
