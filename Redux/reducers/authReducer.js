const LOGIN_SUCCESS_AUTH = "LOGIN_SUCCESS_AUTH";
const SET_WARNING_SHOWN_FALSE = "SET_WARNING_SHOWN_FALSE";
const UPDATE_AUTH_DATA = "UPDATE_AUTH_DATA";
const AUTO_LOGIN_SUCCESS = "AUTO_LOGIN_SUCCESS";
const SIGN_OUT = "SIGN_OUT";

const currentState = {
  signedIn: false,
  userID: "empty",
  token: null,

  warningShown: false,

  firstName: "",
  lastName: "",

  mixColorsTotalCorrect: null,
  mixColorsCorrectPercentage: null,
  mixColorsFurthestLevel: null,

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

  palette: undefined,
};

export default (state = currentState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_AUTH:
      currentState.userID = action.payload.userid;
      currentState.signedIn = true;
      currentState.firstName = action.payload.first_name;
      currentState.lastName = action.payload.last_name;
      currentState.mixColorsTotalCorrect =
        action.payload.mix_colors_answers_correct;
      currentState.mixColorsCorrectPercentage = 0;
      currentState.guessHexTotalColors =
        action.payload.guess_hex_colors_guessed;
      currentState.guessHexEasyTotalRight =
        action.payload.guess_hex_easy_total_right;
      currentState.guessHexEasyTotalTries =
        action.payload.guess_hex_easy_total_tries;
      currentState.guessHexEasyPercentCorrect = 0;
      currentState.guessHexMediumTotalRight =
        action.payload.guess_hex_medium_total_right;
      currentState.guessHexMediumTotalTries =
        action.payload.guess_hex_medium_total_tries;
      currentState.guessHexMediumPercentCorrect = 0;
      currentState.guessHexHardTotalRight =
        action.payload.guess_hex_hard_total_right;
      currentState.guessHexHardTotalTries =
        action.payload.guess_hex_hard_total_tries;
      currentState.guessHexHardPercentCorrect = 0;
      currentState.mixColorsFurthestLevel = action.payload.mix_furthest_level;
      currentState.palette = action.payload.playground_palette;
      return { ...currentState };
    case SET_WARNING_SHOWN_FALSE:
      currentState.warningShown = true;
      return { ...currentState };
    case UPDATE_AUTH_DATA:
      currentState.firstName = action.payload.first_name;
      currentState.lastName = action.payload.last_name;
      currentState.mixColorsTotalCorrect =
        action.payload.mix_colors_answers_correct;
      currentState.mixColorsCorrectPercentage = 0;
      currentState.guessHexTotalColors =
        action.payload.guess_hex_colors_guessed;
      currentState.guessHexEasyTotalRight =
        action.payload.guess_hex_easy_total_right;
      currentState.guessHexEasyTotalTries =
        action.payload.guess_hex_easy_total_tries;
      currentState.guessHexEasyPercentCorrect = 0;
      currentState.guessHexMediumTotalRight =
        action.payload.guess_hex_medium_total_right;
      currentState.guessHexMediumTotalTries =
        action.payload.guess_hex_medium_total_tries;
      currentState.guessHexMediumPercentCorrect = 0;
      currentState.guessHexHardTotalRight =
        action.payload.guess_hex_hard_total_right;
      currentState.guessHexHardTotalTries =
        action.payload.guess_hex_hard_total_tries;
      currentState.guessHexHardPercentCorrect = 0;
      currentState.mixColorsFurthestLevel = action.payload.mix_furthest_level;
      currentState.palette = action.payload.playground_palette;
      return { ...currentState };
    case AUTO_LOGIN_SUCCESS:
      currentState.userID = action.payload.userid;
      currentState.signedIn = true;
      currentState.firstName = action.payload.first_name;
      currentState.lastName = action.payload.last_name;
      currentState.mixColorsTotalCorrect =
        action.payload.mix_colors_answers_correct;
      currentState.mixColorsCorrectPercentage = 0;
      currentState.guessHexTotalColors =
        action.payload.guess_hex_colors_guessed;
      currentState.guessHexEasyTotalRight =
        action.payload.guess_hex_easy_total_right;
      currentState.guessHexEasyTotalTries =
        action.payload.guess_hex_easy_total_tries;
      currentState.guessHexEasyPercentCorrect = 0;
      currentState.guessHexMediumTotalRight =
        action.payload.guess_hex_medium_total_right;
      currentState.guessHexMediumTotalTries =
        action.payload.guess_hex_medium_total_tries;
      currentState.guessHexMediumPercentCorrect = 0;
      currentState.guessHexHardTotalRight =
        action.payload.guess_hex_hard_total_right;
      currentState.guessHexHardTotalTries =
        action.payload.guess_hex_hard_total_tries;
      currentState.guessHexHardPercentCorrect = 0;
      currentState.mixColorsFurthestLevel = action.payload.mix_furthest_level;
      currentState.palette = action.payload.playground_palette;
      return { ...currentState };
    case SIGN_OUT:
      currentState.userID = null;
      currentState.signedIn = false;
      currentState.firstName = "";
      currentState.lastName = "";
      currentState.mixColorsTotalCorrect = null;
      currentState.mixColorsCorrectPercentage = 0;
      currentState.guessHexTotalColors = null;
      currentState.guessHexEasyTotalRight = null;
      currentState.guessHexEasyTotalTries = null;
      currentState.guessHexEasyPercentCorrect = 0;
      currentState.guessHexMediumTotalRight = null;
      currentState.guessHexMediumTotalTries = null;
      currentState.guessHexMediumPercentCorrect = 0;
      currentState.guessHexHardTotalRight = null;
      currentState.guessHexHardTotalTries = null;
      currentState.guessHexHardPercentCorrect = 0;
      currentState.mixColorsFurthestLevel = null;
      currentState.palette = undefined;
      return { ...currentState };
    default:
      return state;
  }
};
