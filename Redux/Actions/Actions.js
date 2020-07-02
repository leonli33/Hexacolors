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

export const AddColorToPlaygroundList = () => {
  return {
    type: "ADD_COLOR_TO_PLAYGROUND_LIST"
  }
}

export const createNewUser = (email, password) => {
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
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: "CREATE_NEW_USER" });
  };
};

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

    dispatch({ type: "LOGIN" });
  };
};
