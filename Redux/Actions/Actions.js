import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { Alert } from "react-native";

export const SetCurrentColorAndColorsUsed = (task) => {
  return {
    type: "SET_COLOR_AND_COLORS_USED",
    payload: task,
  };
};

export const SetCurrentColorAndColorsUsedDynamicMix = (task) => {
  return {
    type: "SET_COLOR_AND_COLORS_USED_MIX_DYNAMIC",
    payload: task,
  };
};

export const AddUserChosenColor = (color) => {
  return {
    type: "ADD_USER_CHOSEN_COLOR",
    payload: color,
  };
};

export const AddUserChosenColorDynamicMix = (color) => {
  return {
    type: "ADD_USER_CHOSEN_COLOR_DYNAMIC_MIX",
    payload: color,
  };
};

export const RemoveUserChosenColor = (color) => {
  return {
    type: "REMOVE_USER_CHOSEN_COLOR",
    payload: color,
  };
};

export const RemoveUserChosenColorDynamixMix = (color) => {
  return {
    type: "REMOVE_USER_CHOSEN_COLOR_DYNAMIC_MIX",
    payload: color,
  };
};

export const ResetColors = () => {
  return {
    type: "RESET_LEVEL_COLORS",
  };
};

export const ResetPlaygroundColors = () => {
  return {
    type: "RESET_PLAYGROUND_COLORS",
  };
};

export const ResetColorsDynamixMix = () => {
  return {
    type: "RESET_LEVEL_COLORS_DYNAMIC_MIX",
  };
};

export const AddUserChosenColorPlayground = (color) => {
  return {
    type: "ADD_USER_CHOSEN_COLOR_PLAYGROUND",
    payload: color,
  };
};

export const RemoveUserChosenColorPlayground = (color) => {
  return {
    type: "REMOVE_USER_CHOSEN_COLOR_PLAYGROUND",
    payload: color,
  };
};

export const IncrementFurthestLevel = (level) => {
  return {
    type: "INCREMENT_FURTHEST_LEVEL",
    payload: level,
  };
};

export const Generate8ColorPaletteAndMix = () => {
  return {
    type: "GENERATE_8_COLOR_PALETTE_AND_MIX",
  };
};

export const Generate10ColorPaletteAndMix = () => {
  return {
    type: "GENERATE_10_COLOR_PALETTE_AND_MIX",
  };
};

export const Generate12ColorPaletteAndMix = () => {
  return {
    type: "GENERATE_12_COLOR_PALETTE_AND_MIX",
  };
};

export const CreateNewColorToGuess = () => {
  return {
    type: "CREATE_COLOR_TO_GUESS",
  };
};

export const GenerateColorsToGuessEasy = () => {
  return {
    type: "GENERATE_EASY_GUESS_OPTIONS",
  };
};

export const GenerateColorsToGuessMedium = () => {
  return {
    type: "GENERATE_MEDIUM_GUESS_OPTIONS",
  };
};

export const GenerateColorsToGuessHard = () => {
  return {
    type: "GENERATE_HARD_GUESS_OPTIONS",
  };
};

export const AddColorToPlaygroundList = (color) => {
  return {
    type: "ADD_COLOR_TO_PLAYGROUND_LIST",
    payload: color,
  };
};

export const IncrementTotalLevelsCompleted = () => {
  return {
    type: "INCREMENT_TOTAL_LEVELS_COMPLETED",
  };
};

export const RemoveColorFromPlaygroundList = (colors) => {
  return {
    type: "REMOVE_COLOR_FROM_PLAYGROUND_LIST",
    payload: colors,
  };
};

export const loginSuccessDataAuth = (data) => {
  return {
    type: "LOGIN_SUCCESS_AUTH",
    payload: data,
  };
};

export const updateAuthData = (data) => {
  return {
    type: "UPDATE_AUTH_DATA",
    payload: data,
  };
};

export const loginSuccessDataMixColors = (data) => {
  return {
    type: "LOGIN_SUCCESS_MIX_COLORS",
    payload: data,
  };
};

export const loginSuccessDataPlayground = (data) => {
  return {
    type: "LOGIN_SUCCESS_PLAYGROUND",
    payload: data,
  };
};

export const SetWarningShownFalse = () => {
  return {
    type: "SET_WARNING_SHOWN_FALSE",
  };
};

export const loginAuto = (data) => {
  return {
    type: "AUTO_LOGIN_SUCCESS",
    payload: data,
  };
};

export const signUserOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const register = (info) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: info,
  };
};

// register a user
export const createNewUser = (email, password, firstName, lastName) => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          let userId = cred.user.uid;
          let jsonObject = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            mix_colors_answers_correct: 0,
            mix_furthest_level: 0,
            playground_palette: [
              "#EA4335",
              "#4285F4",
              "#FFED1C",
              "#34A853",
              "#942EBE",
              "#00ECFA",
              "#F8712E",
              "#181762",
            ],
            guess_hex_easy_total_right: 0,
            guess_hex_easy_total_tries: 0,
            guess_hex_medium_total_right: 0,
            guess_hex_medium_total_tries: 0,
            guess_hex_hard_total_right: 0,
            guess_hex_hard_total_tries: 0,
            guess_hex_colors_guessed: [],
          };
          const ref = firebase.firestore().collection("users");
          ref.doc(userId).set(jsonObject);
          dispatch(
            register({
              first_name: firstName,
              last_name: lastName,
              userid: userId,
            })
          );
        });
    } catch (error) {
      let errorMessage = error.message;
      if (errorMessage === "EMAIL_EXISTS") {
        errorMessage = "This email has already been used.";
      }
      throw new Error(errorMessage);
    }
  };
};

// Regular login
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      let userID = firebase.auth().currentUser.uid;

      await firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .get()
        .then((snapshot) => {
          let data = snapshot.data();
          let authData = { ...data, userid: userID };
          let mixColorData = {
            furthestLevel: data.mix_furthest_level,
            totalLevels: data.mix_colors_answers_correct,
          };
          let playgroundData = {
            palette: data.playground_palette,
          };
          dispatch(loginSuccessDataAuth(authData));
          dispatch(loginSuccessDataMixColors(mixColorData));
          dispatch(loginSuccessDataPlayground(playgroundData));
        });
    } catch (error) {
      let errorMessage = error.message;
      throw new Error(errorMessage);
    }
  };
};

// Log the user in if they were previously logged in
export const autoLogin = (userId) => {
  return async function autoLoginFunc(dispatch) {
    try {
      let unpackedData = await firebase
        .firestore()
        .collection("users")
        .doc(userId);
      let getData = await unpackedData.get();
      let data = await getData.data();
      let mixColorData = {
        furthestLevel: data.mix_furthest_level,
        totalLevels: data.mix_colors_answers_correct,
      };
      let playgroundData = {
        palette: data.playground_palette,
      };
      dispatch(loginAuto({ ...data, userid: userId }));
      dispatch(loginSuccessDataMixColors(mixColorData));
      dispatch(loginSuccessDataPlayground(playgroundData));
    } catch (error) {
      let errorMessage = error.message;
      Alert.alert("An error has occured!", "" + errorMessage, [
        { text: "Okay" },
      ]);
    }
  };
};

// log the user out
export const logout = () => {
  return async function signout(dispatch) {
    try {
      await firebase.auth().signOut();
      dispatch(signUserOut());
    } catch (error) {
      let errorMessage = error.message;
      Alert.alert("An error has occured!", "" + errorMessage, [
        { text: "Okay" },
      ]);
    }
  };
};
