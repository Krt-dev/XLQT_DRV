import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const ProcessScreen = ({ navigation, route }) => {
    const { itemId } = route.params || {};

    useEffect(() => {
        if (itemId) {
            console.log('ProcessScreen received itemId:', itemId);
        } else {
            console.warn('No itemId passed to ProcessScreen');
        }
    }, [itemId]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                navigation.navigate('Map');
            };
        }, [navigation])
    );

    return (
        <View>
            <Text>Processing item with ID: {itemId ? itemId : 'No Item ID'}</Text>
        </View>
    );
};

export default ProcessScreen;


