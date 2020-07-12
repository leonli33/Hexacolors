import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const SetCurrentColorAndColorsUsed = (task) => {
  return {
    type: "SET_COLOR_AND_COLORS_USED",
    payload: task,
  };
};

export const AddUserChosenColor = (color) => {
  return {
    type: "ADD_USER_CHOSEN_COLOR",
    payload: color,
  };
};

export const RemoveUserChosenColor = (color) => {
  return {
    type: "REMOVE_USER_CHOSEN_COLOR",
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

export const IncrementFurthestLevelHexMix = (level) => {
  return {
    type: "INCREMENT_FURTHEST_LEVEL",
    payload: level,
  };
};

export const IncrementFurthestLevel = (level) => {
  return async (dispatch) => {
    dispatch(IncrementFurthestLevelHexMix(level));
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

export const loginSuccessDataGuessHex = (data) => {
  return {
    type: "LOGIN_SUCCESS_GUESS_HEX",
    payload: data,
  };
};

export const createNewUser = (email, password, firstName, lastName) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBNhvMO_n8O8TzCEFLC24KRGev9kH8Rh3k",
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.error.message;
      let message = "Something went wrong.";
      if (errorMessage === "EMAIL_EXISTS") {
        message = "This email has already been used.";
      }
      throw new Error(message);
    } else {
      const resData = await response.json();
      const userID = resData.localId;

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
      ref.doc(userID).set(jsonObject);
      dispatch({ type: "CREATE_NEW_USER" });
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      let userID = firebase.auth().currentUser.uid;
      let userData = await firebase
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
          let guessHexData = {
            guessHexTotalColors: data.guess_hex_colors_guessed,
            guessHexEasyTotalRight: data.guess_hex_easy_total_right,
            guessHexEasyTotalTries: data.guess_hex_easy_total_tries,
            guessHexMediumTotalRight: data.guess_hex_medium_total_right,
            guessHexMediumTotalTries: data.guess_hex_medium_total_tries,
            guessHexHardTotalRight: data.guess_hex_hard_total_right,
            guessHexHardTotalTries: data.guess_hex_hard_total_tries,
          };
          dispatch(loginSuccessDataAuth(authData));
          dispatch(loginSuccessDataMixColors(mixColorData));
          dispatch(loginSuccessDataPlayground(playgroundData));
          dispatch(loginSuccessDataGuessHex(guessHexData));
        });
    } catch (error) {
      console.log("Login Request Error");
      console.log(error);
      throw new Error(error.toString());
    }
  };
};

/*
  export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNhvMO_n8O8TzCEFLC24KRGev9kH8Rh3k",
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      const errorMessage = error.error.message;
      let message = "Something went wrong.";
      if (errorMessage === "INVALID_EMAIL") {
        message = "This email could not be found";
      } else if (errorMessage === "INVALID_PASSWORD") {
        message = "This password is not valid";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    dispatch(loginSuccess());
  };
};

*/
