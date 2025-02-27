/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setDeliveryItems,
  startDelivery,
  setRejectionData,
  selectDelivery,
} from './.././store/deliverySlice';
import {
  setZoomLevel,
  updateRegion,
  setSelectedMarker,
  setSearchQuery,
} from './../store/mapSlice';

import { DELIVERY_ITEMS } from './constants/dataDelivery';
import CustomMarker from './components/customMarker';
import TaskSlider from './components/TaskSlider';
import MaterialButtonModal from './components/MaterialButtonModal';
import { store } from '../store/store';


const MapScreen = () => {
  console.log('Current Redux state:', store.getState());
  const dispatch = useDispatch();
  const { zoomLevel, region, searchQuery } = useSelector(state => state.map);
  const { items: deliveryItems, selectedDeliveryId } = useSelector(state => state.deliveries);

  useEffect(() => {
    console.log('Setting delivery items:', DELIVERY_ITEMS);
    dispatch(setDeliveryItems(DELIVERY_ITEMS));
  }, [dispatch]);

  const onStartTrip = (item) => {
    dispatch(startDelivery(item.id));
  };

  const onReject = (item) => {
    dispatch(setRejectionData({ deliveryId: item.id }));
  };

  const onRegionChangeComplete = (newRegion) => {
    dispatch(setZoomLevel(newRegion.latitudeDelta));
    dispatch(updateRegion(newRegion));
  };

  const onMarkerPress = (deliveryId) => {
    dispatch(selectDelivery(deliveryId));
    dispatch(setSelectedMarker(deliveryId));
  };

  const onSearchChange = (text) => {
    dispatch(setSearchQuery(text));
  };

  console.log('MapScreen deliveryItems:', deliveryItems);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsCompass={false}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {deliveryItems?.map((item) => (
          <CustomMarker
            key={item.id}
            coordinate={item.routeCoordinates[0]}
            label={item.id}
            zoomLevel={zoomLevel}
            onPress={() => onMarkerPress(item.id)}
          />
        ))}
      </MapView>
      <View style={styles.searchBox}>
        <Icon name="magnify" size={30} color="#1ABDD4" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#A6A6A6"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0, color: '#000' }}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
      <MaterialButtonModal>
        <View style={styles.container}>
          <Text style={styles.text}>Temporary material list</Text>
        </View>
      </MaterialButtonModal>
      <TaskSlider />
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
