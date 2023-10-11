import React from 'react';
import { Provider } from 'react-redux';
import store from './store/ReduxStore';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import homeScreen from './src/screens/HomeScreen';
import repoDetailScreen from './src/screens/RepoDetailScreen';

import { enableScreens } from 'react-native-screens';
enableScreens();

import { SafeAreaProvider } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GitHubDisplay from './src/screens/GitHubDisplay'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="home" component={homeScreen} />

    <Stack.Screen name="repoDetailScreen" component={repoDetailScreen} />
  </Stack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="github" component={GitHubDisplay} />
          <Stack.Screen name="repoDetailScreen" component={repoDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
);

export default App;
