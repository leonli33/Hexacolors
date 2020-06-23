import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LevelsScreen from './MixColorScreens/LevelsScreen'
import GameScreen from './MixColorScreens/GameScreen'
import StartScreen from './MixColorScreens/StartScreen'
import GuessHexDifficultyChoice from './GuessHexColorScreens/GuessHexDifficultyChoice'
import GuessColorScreen from './GuessHexColorScreens/GuessColorScreen'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Reducers from './Redux/Reducers'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import Colors from './Constants/Colors'

const AllScreens = createStackNavigator();
const store = createStore(Reducers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AllScreens.Navigator initialRouteName="GuessHexDifficultyScreen">
          <AllScreens.Screen name="Home" component={StartScreen} 
                        options={{title: 'HexaColors',
                                  headerTitleAlign: 'center',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  }}}></AllScreens.Screen>
          <AllScreens.Screen  name="Levels" 
                              component={LevelsScreen} 
                              options={{
                                title: 'Levels',
                                headerTitleAlign: 'center',
                                headerStyle: {
                                    backgroundColor: Colors.buttonBackground,
                                },
                                headerTintColor: '#000',
                                headerTitleStyle: {
                                  fontWeight: 'bold',
                                }}}/>
          <AllScreens.Screen name="Game" component={GameScreen} 
                             options={{
                                  title: 'Level',
                                  headerTitleAlign: 'center',
                                  headerStyle: {
                                      backgroundColor: '#f4511e',
                                  },
                                  headerTintColor: '#fff',
                                  headerTitleStyle: {
                                    fontWeight: 'bold',
                                  },}}/>
                                  
          <AllScreens.Screen  name="GuessHexDifficultyScreen"
                              component={GuessHexDifficultyChoice} 
                              options ={{
                                title: 'Difficulty',
                                headerTitleAlign: 'center',
                                headerTitleStyle: {
                                  fontWeight: 'bold',
                                }
                              }}
                              />
            <AllScreens.Screen name="GuessHexGameScreen"
                               component={GuessColorScreen}
                               options={{
                                  title: "Guess the hex",
                                  headerTitleAlign: 'center',
                               }}/>
        

        </AllScreens.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

//          <AllScreens.Screen name="ModalWinGame" component={ColorMixerWonScreen}/>

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
