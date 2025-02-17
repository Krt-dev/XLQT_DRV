import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';

const CustomMarker = memo(({ coordinate, label, zoomLevel }) => {
    const fontSize = Math.max(15, Math.min(14, 24 - zoomLevel * 500));
    return (
        <Marker coordinate={coordinate}>
            <View style={styles.markerContainer}>
                <Image
                    source={require('../../assets/icons/custom_Marker.png')}
                    style={styles.markerImage}
                />
                <Text style={[styles.markerText, { fontSize }]}>{label}</Text>
            </View>
        </Marker>
    );
});

const styles = StyleSheet.create({
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    markerImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    markerText: {
        position: 'absolute',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        top: '10%',
    },
});

export default CustomMarker;
