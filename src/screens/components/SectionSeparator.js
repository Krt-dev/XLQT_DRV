import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionSeparator = ({ title }) => {
    return (
        <View style={styles.routesSeparator}>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    routesSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Karla-Medium',
        color: '#333',
        marginHorizontal: 12,
    },
});

export default SectionSeparator;
