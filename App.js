import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';

import HomeScreen from './src/screens/HomeScreen.js';
import MapScreen from './src/screens/MapScreen.js';
import DeliveryHistoryScreen from './src/screens/DeliveryHistoryScreen.js';
import LogScreen from './src/screens/LogsScreen.js';
import ProcessScreen from './src/screens/ProcessScreen.js';

import ChartIconActive from './src/assets/icons/chart-mixed.svg';
import ChartIconInactive from './src/assets/icons/chart-mixed_Inactive.svg';
import MapIconActive from './src/assets/icons/new_map_active.svg';
import MapIconInactive from './src/assets/icons/new_map_inactive.svg';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabBarIcon = (route, focused) => ({ size }) => {
  const icons = {
    Home: {
      active: ChartIconActive,
      inactive: ChartIconInactive,
    },
    Map: {
      active: MapIconActive,
      inactive: MapIconInactive,
    },
  };

  const IconComponent = focused ? icons[route.name].active : icons[route.name].inactive;
  return <IconComponent width={size} height={size} />;
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="DeliveryHistory"
      component={DeliveryHistoryScreen}
      options={{
        title: 'Delivery History',
        headerStyle: { backgroundColor: '#1882A1' },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="LogScreen"
      component={LogScreen}
      options={{
        title: 'Log History',
        headerStyle: { backgroundColor: '#1882A1' },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

const MapStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="ProcessScreen"
      component={ProcessScreen}
      options={{
        title: 'Process',
        headerStyle: { backgroundColor: '#1882A1' },
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size }) => getTabBarIcon(route, focused)({ size }),
      tabBarActiveTintColor: '#0CC2DC',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#ffff' },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Map" component={MapStack} />
  </Tab.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
