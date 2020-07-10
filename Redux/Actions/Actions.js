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

export const IncrementFurthestLevel = (level) => {
  /*
  return async (dispatch) => {
    const response = await fetch(
      "https://color-app-8e9c2.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({}),
      }
    );
      */
  return {
    type: "INCREMENT_FURTHEST_LEVEL",
    payload: level,
  };
  // };
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

export const RemoveColorFromPlaygroundList = (colors) => {
  return {
    type: "REMOVE_COLOR_FROM_PLAYGROUND_LIST",
    payload: colors,
  };
};

export const loginSuccess = () => {
  return {
    type: "LOGIN",
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
        mix_colors_total_presses: 0,
        mix_furthest_level: 1,
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
      };
      const ref = firebase.firestore().collection("users");
      ref.doc(userID).set(jsonObject);
      dispatch({ type: "CREATE_NEW_USER" });
    }
  };
};

export const login = (email, password) => {
  console.log(email, "email");
  return async (dispatch) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(response, "response");
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid);

      console.log(firebase.auth().currentUser.uid, "user id");
      console.log("login success");
      dispatch(loginSuccess());
      // dispatch(loginSuccess(userRef));
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
