import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LevelsScreen from './Screens/LevelsScreen'
import GameScreen from './Screens/GameScreen'
import StartScreen from './Screens/StartScreen'
import ColorMixerWonScreen from './Components/ColorMixerWonScreen'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Reducers from './Redux/Reducers'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import Colors from './Constants/Colors'

const Stack = createStackNavigator();
const store = createStore(Reducers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={StartScreen} 
                        options={{title: 'HexaColors',
                                  headerTitleAlign: 'center',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  }}}></Stack.Screen>
          <Stack.Screen name="Levels" component={LevelsScreen} 
                                  options={{title: 'Levels',
                                  headerTitleAlign: 'center',
                                  headerStyle: {
                                      backgroundColor: Colors.buttonBackground,
                                  },
                                  headerTintColor: '#000',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  }}}/>
          <Stack.Screen name="Game" component={GameScreen} 
                        options={{title: 'Level',
                                  headerTitleAlign: 'center',
                                  headerStyle: {
                                      backgroundColor: '#f4511e',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  },}}/>
          <Stack.Screen name="ModalWinGame" component={ColorMixerWonScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
