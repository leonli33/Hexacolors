const LOGIN_SUCCESS_AUTH = "LOGIN_SUCCESS_AUTH";

const currentState = {
  signedIn: false,
  userID: "empty",
  token: null,

  firstName: "",
  lastName: "",
  mixColorsTotalCorrect: null,
  mixColorsCorrectPercentage: null,

  guessHexTotalColors: undefined,

  guessHexEasyTotalRight: null,
  guessHexEasyTotalTries: null,
  guessHexEasyPercentCorrect: null,

  guessHexMediumTotalRight: null,
  guessHexMediumTotalTries: null,
  guessHexMediumPercentCorrect: null,

  guessHexHardTotalRight: null,
  guessHexHardTotalTries: null,
  guessHexHardPercentCorrect: null,
};

export default (state = currentState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_AUTH:
      currentState.userID = action.payload.userid
      currentState.signedIn = true;
      currentState.firstName = action.payload.first_name;
      currentState.lastName = action.payload.last_name;
      currentState.mixColorsTotalCorrect = action.payload.mix_colors_answers_correct;
      currentState.mixColorsCorrectPercentage = 0;
      currentState.guessHexTotalColors = action.payload.guess_hex_colors_guessed;
      currentState.guessHexEasyTotalRight = action.payload.guess_hex_easy_total_right;
      currentState.guessHexEasyTotalTries = action.payload.guess_hex_easy_total_tries;
      currentState.guessHexEasyPercentCorrect = 0;
      currentState.guessHexMediumTotalRight = action.payload.guess_hex_medium_total_right;
      currentState.guessHexMediumTotalTries = action.payload.guess_hex_medium_total_tries;
      currentState.guessHexMediumPercentCorrect = 0;
      currentState.guessHexHardTotalRight = action.payload.guess_hex_hard_total_right;
      currentState.guessHexHardTotalTries = action.payload.guess_hex_hard_total_tries;
      currentState.guessHexHardPercentCorrect = 0;
      return { ...currentState };
    default:
      return state;
  }
};
