import React from 'react';
import { Provider } from 'react-redux';
import store from './store/ReduxStore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
enableScreens();
import { SafeAreaProvider } from 'react-native-safe-area-context'
import GitHubDisplay from './src/screens/GitHubDisplay'
import GitHubRepoDisplay from './src/screens/GitHubRepoDisplay'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="Home" component={GitHubDisplay} />
          <Stack.Screen name="githubrepo" component={GitHubRepoDisplay} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
);

export default App;
