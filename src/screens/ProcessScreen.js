import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const ProcessScreen = ({ route }) => {
    const { itemId } = route.params || {};  // Fallback to an empty object if route.params is undefined

    useEffect(() => {
        if (itemId) {
            // Use the itemId for any fetching or logic
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
