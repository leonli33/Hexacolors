const LOGIN_SUCCESS_AUTH = "LOGIN_SUCCESS_AUTH";
const SET_WARNING_SHOWN_FALSE = "SET_WARNING_SHOWN_FALSE";
const UPDATE_AUTH_DATA = "UPDATE_AUTH_DATA";
const AUTO_LOGIN_SUCCESS = "AUTO_LOGIN_SUCCESS";
const SIGN_OUT = "SIGN_OUT";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";

// All the information needed in the account screen
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
      let arr = splitArray(action.payload.playground_palette);
      currentState.palette = arr;
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
      let formattedArr = splitArray(action.payload.playground_palette);
      currentState.palette = formattedArr;
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
      let array = splitArray(action.payload.playground_palette);
      currentState.palette = array;
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

    case REGISTER_SUCCESS:
      currentState.userID = action.payload.userid;
      currentState.signedIn = true;
      currentState.firstName = action.payload.first_name;
      currentState.lastName = action.payload.last_name;
      currentState.mixColorsTotalCorrect = 0;
      currentState.mixColorsCorrectPercentage = 0;
      currentState.guessHexTotalColors = [];
      currentState.guessHexEasyTotalRight = 0;
      currentState.guessHexEasyTotalTries = 0;
      currentState.guessHexEasyPercentCorrect = 0;
      currentState.guessHexMediumTotalRight = 0;
      currentState.guessHexMediumTotalTries = 0;
      currentState.guessHexMediumPercentCorrect = 0;
      currentState.guessHexHardTotalRight = 0;
      currentState.guessHexHardTotalTries = 0;
      currentState.guessHexHardPercentCorrect = 0;
      currentState.mixColorsFurthestLevel = 0;
      let arr2 = splitArray([
        "#EA4335",
        "#4285F4",
        "#FFED1C",
        "#34A853",
        "#942EBE",
        "#00ECFA",
        "#F8712E",
        "#181762",
      ]);
      currentState.palette = arr2;
      return { ...currentState };
    default:
      return state;
  }
};

// Split the array so that the colors are in arrays of 2
function splitArray(colorArr) {
  let newArr = [];
  let row = ["", ""];
  let counter = 0;
  for (let i = 0; i < colorArr.length; i++) {
    row[counter] = colorArr[i];
    if (counter === 1) {
      newArr.push(row);
      row = ["", ""];
      counter = 0;
    } else {
      counter++;
    }
  }
  if (row[0] != "") newArr.push(row);
  return newArr;
}
