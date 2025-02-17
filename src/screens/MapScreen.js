/* eslint-disable react-native/no-inline-styles */


import React, { useRef } from 'react';
import { View, Text, TextInput, ScrollView, Animated, StyleSheet, Dimensions } from 'react-native';
// import TaskCards from './components/TaskCards';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DELIVERY_ITEMS } from '../screens/constants/dataDelivery';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const MapScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {/* <Marker
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        image={{ uri: 'https://res.cloudinary.com/dvl2ylwpd/image/upload/v1739516748/custom_Marker_vhdgb0.png' }}
      >
        <View style={{ position: 'absolute', top: -10, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: 'black', backgroundColor: 'white', padding: 2, borderRadius: 4 }}>1</Text>
        </View>
      </Marker> */}
      </MapView>
      <View style={styles.searchBox}>
        <Icon name="magnify" size={30} color="#1ABDD4" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#A6A6A6"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0, color: '#000' }}
        />
      </View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={styles.scrollView}
      >
        {DELIVERY_ITEMS.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.storeName}>{item.store}</Text>
            <Text style={styles.details}>{item.date}</Text>
            <Text style={styles.details}>{item.location}</Text>
            <Text style={styles.details}>{item.time}</Text>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carContainer: {
    // position: 'absolute',
    bottom: 30,
    width: '100%',
    flex: 1,
  },
  searchBox: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 15,
  },
  scrollView: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    height: 133,
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default MapScreen;
