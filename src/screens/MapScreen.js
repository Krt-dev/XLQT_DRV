/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { DELIVERY_ITEMS } from './constants/dataDelivery';
import CustomMarker from './components/customMarker';
import TaskSlider from './components/TaskSlider';
import MapBottomCards from './components/MapBottomCards';



const MapScreen = () => {
  const [zoomLevel, setZoomLevel] = useState(0.015);
  const mapRef = useRef(null);
  const location = { latitude: 37.78825, longitude: -122.4324 };

  const onStartTrip = (item) => {
    console.log('Start Trip clicked for:', item);
    // Add your logic for starting the trip
  };

  const onReject = (item) => {
    console.log('Reject clicked for:', item);
    // Add your logic for rejecting the trip
  };

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: zoomLevel,
    longitudeDelta: zoomLevel * (16 / 9),
  };

  const onRegionChangeComplete = (region) => {
    setZoomLevel(region.latitudeDelta);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsCompass={false}
        initialRegion={initialRegion}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <CustomMarker coordinate={location} label="1" zoomLevel={zoomLevel} />
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
      <TaskSlider
        deliveryItems={DELIVERY_ITEMS}
        onStartTrip={onStartTrip}
        onReject={onReject}
      />
      {/* <MapBottomCards /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    position: 'relative',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carContainer: {
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
    zIndex: 1,
  },
  scrollView: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    height: 133,
    // width: CARD_WIDTH,
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
