import React from "react";
import LevelsScreen from "./MixColorScreens/LevelsScreen";
import GameScreen from "./MixColorScreens/GameScreen";
import StartScreen from "./GeneralScreens/StartScreen";
import GuessHexDifficultyChoice from "./GuessHexColorScreens/GuessHexDifficultyChoice";
import GuessColorScreen from "./GuessHexColorScreens/GuessColorScreen";
import GameModeScreen from "./GeneralScreens/GameModeScreen";
import OptionScreen from "./AccountScreens/SignInScreen";
import RegisterScreen from "./AccountScreens/RegisterScreen";
import AccountScreen from "./AccountScreens/AccountScreen";
import PlaygroundScreen from "./PlayGroundScreens/PlaygroundScreen";
import StartupScreen from "./GeneralScreens/StartupScreen";
import MixColorDynamicDifficulty from "./MixColorScreens/MixColorDynamicDifficulty";
import MixColorsDynamicScreen from "./MixColorScreens/MixColorsDynamicScreen";
import GameModeColorMix from "./MixColorScreens/GameModeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MixColorReducer from "./Redux/reducers/mixColorReducer";
import HexGuesserReducer from "./Redux/reducers/hexGuesserReducer";
import PlaygroundReducer from "./Redux/reducers/playgroundReducer";
import MixColorDynamicReducer from "./Redux/reducers/mixColorsDynamicReducer";
import AuthReducer from "./Redux/reducers/authReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import Colors from "./Constants/Colors";
import * as firebase from "firebase";
import { firebaseConfig } from "./Constants/FirebaseApi";

const AllScreens = createStackNavigator();

const rootReducer = combineReducers({
  mixColors: MixColorReducer,
  mixColorsDynamic: MixColorDynamicReducer,
  hexGuesser: HexGuesserReducer,
  playground: PlaygroundReducer,
  auth: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : {};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AllScreens.Navigator initialRouteName="Startup">
          <AllScreens.Screen
            component={StartupScreen}
            name="Startup"
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              gestureEnabled: false,
            }}
          />

          <AllScreens.Screen
            name="Home"
            component={StartScreen}
            options={{
              headerBackTitleVisible: false,
              headerShown: false,
              gestureEnabled: false,
            }}
          />

          <AllScreens.Screen
            component={OptionScreen}
            name="AuthOptions"
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            component={RegisterScreen}
            name="RegisterScreen"
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            component={AccountScreen}
            name="Profile"
            options={{
              headerShown: false,
              headerBackTitleVisible: false,
              gestureEnabled: false,
            }}
          />

          <AllScreens.Screen
            name="GameMode"
            component={GameModeScreen}
            options={{
              title: "Game Options",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "black",
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            name="Playground"
            component={PlaygroundScreen}
            options={{
              title: "Playground",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "#000",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "black",
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            name="MixHexGameMode"
            component={GameModeColorMix}
            options={{
              title: "Game Mode",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "black",
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            name="MixHexDynamicDifficulty"
            component={MixColorDynamicDifficulty}
            options={{
              title: "Game Difficulty",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "black",
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            name="MixHexDynamicGameMode"
            component={MixColorsDynamicScreen}
            options={{
              title: "Mix Colors",
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerStyle: {
                backgroundColor: Colors.buttonBackground,
              },
              headerTintColor: "black",
              headerBackTitleVisible: false,
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
              headerBackTitleVisible: false,
            }}
          />

          <AllScreens.Screen
            name="Game"
            component={GameScreen}
            options={{
              title: "Choose Difficulty",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTintColor: "black",
              headerBackTitleVisible: false,
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
              headerBackTitleVisible: false,
            }}
          />
          <AllScreens.Screen
            name="GuessHexGameScreen"
            component={GuessColorScreen}
            options={{
              title: "Guess the hex",
              headerTitleAlign: "center",
              headerTintColor: "black",
              headerBackTitleVisible: false,
            }}
          />
        </AllScreens.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
