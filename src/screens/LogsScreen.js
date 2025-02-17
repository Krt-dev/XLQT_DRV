import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogScroller from './components/LogScroller';

const LogScreen = () => {
    return (
        <View style={styles.container}>
            <LogScroller />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexgrow: 1,
        backgroundColor: '#f8f9fa',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default LogScreen;
