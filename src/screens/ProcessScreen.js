import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const ProcessScreen = ({ route }) => {
    const { itemId } = route.params;  // Access the passed itemId

    useEffect(() => {
        // You can use the itemId here, for example, fetching data based on it
        console.log('ProcessScreen received itemId:', itemId);
    }, [itemId]);

    return (
        <View>
            <Text>Processing item with ID: {itemId}</Text>
        </View>
    );
};

export default ProcessScreen;
