import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const ProcessScreen = ({ route }) => {
    const { itemId } = route.params || {};

    useEffect(() => {
        if (itemId) {
            console.log('ProcessScreen received itemId:', itemId);
        } else {
            console.warn('No itemId passed to ProcessScreen');
        }
    }, [itemId]);

    return (
        <View>
            <Text>Processing item with ID: {itemId ? itemId : 'No Item ID'}</Text>
        </View>
    );
};

export default ProcessScreen;
