const SET_COLOR_AND_COLORS_USED = "SET_COLOR_AND_COLORS_USED";
const ADD_USER_CHOSEN_COLOR = "ADD_USER_CHOSEN_COLOR";
const REMOVE_USER_CHOSEN_COLOR = "REMOVE_USER_CHOSEN_COLOR";
const RESET_LEVEL_COLORS = "RESET_LEVEL_COLORS";
const INCREMENT_FURTHEST_LEVEL = "INCREMENT_FURTHEST_LEVEL";

const currentState = {
  // Color at index corresponds to the color of the level
  levelColors: [
    ["#EA4335", "#4285F4"],
    ["#FBBC05", "#34A853"],
    ["#942EBE", "#00ECFA"],
    ["#F8712E", "#181762"],
    ["#FFC6E3", "#696969"],
  ],
  // Contains an array that has the hexcodes of the colors needed
  levelAnswer: [
    "placeholder",
    "#FFC6E3",
    "#986393",
    "#9DA07E",
    "#89B736",
    "#5682DC",
    "#FA961A",
    "#1567AE",
    "#C34C82",
    "#6C3C67",
    "#B88065",
    "#F47923",
    "#ADBD69",
    "#4A94A8",
    "#61C871",
    "#FBA65C",
    "#887EA7",
    "#2271C5",
    "#989E59",
  ],

  // Colors that make up an answer for a given level
  levelComponentsToAnswer: [
    "placeholder",
    ["#FFC6E3"],
    ["#EA4335", "#4285F4"],
    ["#FBBC05", "#4285F4"],
    ["#FBBC05", "#34A853"],
    ["#942EBE", "#00ECFA"],
    ["#FBBC05", "#F8712E"],
    ["#00ECFA", "#181762"],
    ["#942EBE", "#F8712E"],
    ["#F8712E", "#181762"],
    ["#EA4335", "#FBBC05", "#4285F4"],
    ["#EA4335", "#FBBC05", "#F8712E"],
    ["#FBBC05", "#34A853", "#FFC6E3"],
    ["#942EBE", "#34A853", "#00ECFA"],
    ["#FBBC05", "#00ECFA", "#34A853"],
    ["#FBBC05", "#F8712E", "#FFC6E3"],
    ["#F8712E", "#00ECFA", "#942EBE"],
    ["#4285F4", "#00ECFA", "#181762"],
    ["#EA4335", "#FBBC05", "#34A853", "#F8712E", "#00ECFA"],
  ],
  // Take out these colors
  levelHint1: [
    "placeHolder",
    ["#FBBC05", "#34A853", "#942EBE", "#181762", "#4285F4"],
    ["#FFC6E3", "#F8712E", "#942EBE", "#00ECFA"],
    ["#EA4335", "#181762", "#942EBE", "#696969"],
    ["#942EBE", "#00ECFA", "#FFC6E3"],
    ["#4285F4", "#F8712E", "#34A853", "#696969"],
    ["#EA4335", "#00ECFA", "#34A853"],
    ["#181762", "#FFC6E3", "#FBBC05"],
    ["#4285F4", "#34A853", "#EA4335"],
    ["#EA4335", "#34A853", "#00ECFA", "#FFC6E3"],
    ["#F8712E", "#696969", "#942EBE"],
    ["#4285F4", "#34A853"],
    ["#4285F4", "#00ECFA"],
    ["#F8712E", "#4285F4"],
    ["#4285F4", "#942EBE", "#FFC6E3"],
    ["#34A853", "#942EBE"],
    ["#EA4335", "#34A853"],
    ["#34A853", "#942EBE"],
    ["#942EBE"],
  ],

  // starts at level 10
  levelHint2: [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ["#34A853", "#00ECFA"],
    ["#FFC6E3", "#00ECFA"],
    ["#EA4335", "#F8712E"],
    ["#EA4335", "#181762"],
    ["#EA4335"],
    ["#00ECFA"],
    ["#181762"],
    ["#FBBC05"],
    ["#696969"],
  ],
  // Number of colors that the user should select per level
  numColors: [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 5],

  // current level that the user is playing
  currentLevel: 0,
  // furthest level that the user has gotten to
  furthestLevelCompleted: 1,
  // colors that the user has picked to far
  colorsChosenSoFar: [],
  // the hexcode representing the color that
  // results from mixing selected colors
  currentLevelUserHexCode: "",
  // the last resultant color (used for animation)
  lastColorHexcode: "",
};

export default (state = currentState, action) => {
  switch (action.type) {
    case SET_COLOR_AND_COLORS_USED:
      currentState.lastColorHexcode = currentState.currentLevelUserHexCode.trim();
      currentState.currentLevelUserHexCode = action.payload.currentLevelUserHexCode.trim();
      currentState.colorsChosenSoFar = action.payload.currentColorsChosen;
      return { ...currentState };
    case ADD_USER_CHOSEN_COLOR:
      currentState.colorsChosenSoFar.push(action.payload);
      return { ...currentState };
    case REMOVE_USER_CHOSEN_COLOR:
      currentState.colorsChosenSoFar.splice(
        currentState.colorsChosenSoFar.indexOf(action.payload),
        1
      );
      return { ...currentState };
    case RESET_LEVEL_COLORS:
      currentState.colorsChosenSoFar = [];
      currentState.currentLevelUserHexCode = "";
      currentState.lastColorHexcode = "";
      return { ...currentState };
    case INCREMENT_FURTHEST_LEVEL:
      currentState.furthestLevelCompleted <= 17 &&
      action.payload >= currentState.furthestLevelCompleted
        ? currentState.furthestLevelCompleted++
        : "";
      return { ...currentState };
    default:
      return state;
  }
};
