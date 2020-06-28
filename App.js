import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LevelsScreen from "./MixColorScreens/LevelsScreen";
import GameScreen from "./MixColorScreens/GameScreen";
import StartScreen from "./MixColorScreens/StartScreen";
import GuessHexDifficultyChoice from "./GuessHexColorScreens/GuessHexDifficultyChoice";
import GuessColorScreen from "./GuessHexColorScreens/GuessColorScreen";
import GameModeScreen from "./MixColorScreens/GameModeScreen";
import OptionScreen from "./AccountScreens/SignInScreen";
import RegisterScreen from "./AccountScreens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Reducers from "./Redux/Reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk'
import Colors from "./Constants/Colors";

const AllScreens = createStackNavigator();
const store = createStore(Reducers, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AllScreens.Navigator initialRouteName="Home">
          <AllScreens.Screen
            name="Home"
            component={StartScreen}
            options={{
              title: "HexaColors",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />

          <AllScreens.Screen
            component={OptionScreen}
            name="AuthOptions"
            options={{
              headerShown: false,
            }}
          />

          <AllScreens.Screen
            component={RegisterScreen}
            name="RegisterScreen"
            options={{
              headerShown: false,
            }}
          />

          <AllScreens.Screen
            name="GameMode"
            component={GameModeScreen}
            options={{
              title: "Game Modes",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "black",
            }}
          />

          <AllScreens.Screen
            name="Levels"
            component={LevelsScreen}
            options={{
              title: "Levels",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "black",
            }}
          />
          <AllScreens.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: "Level",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "black",
            }}
          />

          <AllScreens.Screen
            name="GuessHexDifficultyScreen"
            component={GuessHexDifficultyChoice}
            options={{
              title: "Difficulty",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "black",
            }}
          />
          <AllScreens.Screen
            name="GuessHexGameScreen"
            component={GuessColorScreen}
            options={{
              title: "Guess the hex",
              headerTitleAlign: "center",
              headerTintColor: "black",
            }}
          />
        </AllScreens.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
