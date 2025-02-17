/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { DRIVER_ITEMS } from './constants/data';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DeliverySlider from './components/DeliverySlider';
//import DeliveryHistoryScreen from './DeliveryHistoryScreen';

const HomeScreen = ({ navigation }) => {
    const tiles = [
        {
            id: 1,
            text: 'Routes',
            icon: 'routes',
            color: '#1ABDD4',
            onPress: () => console.log('Routes pressed'),
            badge: '3',
        },
        {
            id: 2,
            text: 'Packages',
            icon: 'package-variant-closed',
            color: '#3494D0',
            onPress: () => console.log('Packages pressed'),
        },
        {
            id: 3,
            text: 'Scanner',
            icon: 'barcode-scan',
            color: '#0CC2DC',
            onPress: () => console.log('Scanner pressed'),
        },
        {
            id: 4,
            text: 'To do',
            icon: 'format-list-checks',
            color: '#1882A1',
            onPress: () => console.log('Map pressed'),
        },
        {
            id: 5,
            text: 'History',
            icon: 'history',
            color: '#45B7D1',
            onPress: () => navigation.navigate('DeliveryHistory'),
        },
        {
            id: 6,
            text: 'Calendar',
            icon: 'calendar-month',
            color: '#1ABDD4',
            onPress: () => console.log('Calendar pressed'),
        },
    ];

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    data={DRIVER_ITEMS}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.profileContainer}>
                                <Icon name="account-circle" size={46} color="#1ABDD4" />
                                <View style={styles.detailsContainer}>
                                    <Text style={{ fontSize: 8, fontFamily: 'Karla-Light' }}>Hi,</Text>
                                    <View style={styles.nameAndRoleContainer}>
                                        <Text style={styles.name}>{item.title}</Text>
                                        <View style={styles.roleContainer}>
                                            <Text style={styles.roleText}>{item.Role}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.locationContainer}>
                                        <Icon name="map-marker" size={9} color="#1ABDD4" />
                                        <Text style={styles.locationText}>{item.Location}</Text>
                                    </View>
                                </View>
                                <Icon name="bell" size={28} color="#1ABDD4" />
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={{ paddingVertical: 3 }}>
                <View style={styles.mainTitleContainer}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'Karla-Bold',
                    }}>
                        Current Delivery
                    </Text>
                </View>
                <View>
                    <DeliverySlider />
                </View>
                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                    <View style={styles.tileContainer}>
                        {tiles.map((tile) => (
                            <TouchableOpacity
                                key={tile.id}
                                style={[styles.tile, { backgroundColor: tile.color }]}
                                onPress={tile.onPress}
                            >
                                <Icon name={tile.icon} size={32} color="#FFF" />
                                <Text style={styles.tileText}>{tile.text}</Text>
                                {tile.badge && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{tile.badge}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.mainTitleContainer}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily: 'Karla-SemiBold',
                    }}>
                        Completed Deliveries
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LogScreen')}>
                        <Text style={{
                            fontSize: 12,
                            fontFamily: 'Inter_28pt-Regular',
                            color: '#1ABDD4',
                        }}>
                            View all
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        minHeight: 200,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 0,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsContainer: {
        marginLeft: 5,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontFamily: 'Karla-Light',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 8,
        fontFamily: 'Karla-Light',
        color: '#A6A6A6',
        marginLeft: 1,
    },
    nameAndRoleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roleText: {
        marginLeft: 2,
        fontFamily: 'Karla-Bold',
        fontSize: 8,
        padding: 2,
        color: '#fff',
    },
    roleContainer: {
        backgroundColor: '#3494D0',
        marginLeft: 7,
        padding: 2,
        borderRadius: 5,
        alignItems: 'center',
    },
    mainTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    tileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: 3 * 110,
        height: 2 * 110,
        gap: 6,
    },
    tile: {
        width: 88,
        height: 102,
        backgroundColor: '#1ABDD4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 3,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    tileText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Karla-Bold',
        marginTop: 8,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FF4757',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: 'Karla-Bold',
    },
});
