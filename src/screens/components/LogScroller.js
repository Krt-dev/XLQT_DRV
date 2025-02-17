/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { SAMPLE_LOGS } from '../constants/logData';
import moment from 'moment';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icon library

const LogScroller = () => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Arrived at location':
                return <Icon name="map-marker-check" size={44} color="#0CC2DC" />;
            case 'Loading cargo':
                return <Icon name="truck-delivery" size={44} color="#ff8b00" />;
            case 'Loaded cargo':
                return <Icon name="truck-check" size={44} color="#1882A1" />;
            case 'Unloading cargo':
                return <Icon name="truck-minus-outline" size={44} color="#ff8b00" />;
            case 'Unloaded cargo':
                return <Icon name="truck-check-outline" size={44} color="#1882A1" />;
            case 'Delivered':
                return <Icon name="package-variant-closed" size={44} color="#00E408" />;
            default:
                return <Icon name="help-circle" size={44} color="#808080" />;
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {SAMPLE_LOGS.map((log) => (
                <TouchableOpacity key={log.id} style={styles.logCard}>
                    <View style={styles.cardContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 3 }}>
                            {getStatusIcon(log.status)}
                            <View style={{ marginLeft: 18 }}>
                                <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
                                    <Text style={styles.status}>{log.status}, </Text>
                                    <Text style={styles.status}>{moment(log.timestamp).format('MMMM Do YYYY, h:mm A')}</Text>
                                </View>
                                <Text style={styles.storeName}>{log.route}</Text>
                                <Text style={styles.location}>{log.location}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.timeAgo}>{log.minutesAgo} mins ago</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default LogScroller;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    logCard: {
        width: '100%',
        height: 85,
        backgroundColor: '#DEFBFF',
        borderRadius: 5,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 3,
        flex: 1,
    },
    cardContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexwrap: 'wrap',
    },
    storeName: {
        fontSize: 16,
        fontFamily: 'LexendDeca-SemiBold',
    },
    status: {
        fontSize: 10,
        color: '#000000',
        fontFamily: 'Karla-Light',
    },
    location: {
        fontSize: 12,
        color: '#000000',
        fontFamily: 'Karla-Light',
    },
    timeAgo: {
        fontSize: 9,
        color: '#999',
    },
});
