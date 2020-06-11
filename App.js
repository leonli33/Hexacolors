import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LevelsScreen from './Screens/LevelsScreen'
import GameScreen from './Screens/GameScreen'
import StartScreen from './Screens/StartScreen'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={StartScreen}></Stack.Screen>
          <Stack.Screen name="Levels" component={LevelsScreen}></Stack.Screen>
          <Stack.Screen name="Game" component={GameScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
