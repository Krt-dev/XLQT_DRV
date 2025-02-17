import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DELIVERY_ITEMS } from '../constants/dataDelivery';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const TaskSlider = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
        >
            {DELIVERY_ITEMS.map((item) => (
                <View key={item.id} style={styles.card}>
                    <Text style={styles.storeName}>{item.store}</Text>
                    <Text style={styles.details}>{item.date}</Text>
                    <Text style={styles.details}>{item.location}</Text>
                    <Text style={styles.details}>{item.time}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 10,
    },
    card: {
        height: 133,
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
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 14,
        color: '#555',
    },
});

export default TaskSlider;
