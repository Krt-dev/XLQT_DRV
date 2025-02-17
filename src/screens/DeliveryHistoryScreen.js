import React from 'react';
import { View, StyleSheet } from 'react-native';
import DeliveryScroller from './components/DeliveryScroller';


const DeliveryHistoryScreen = () => {
    return (
        <View style={styles.container}>
            <DeliveryScroller />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default DeliveryHistoryScreen;
