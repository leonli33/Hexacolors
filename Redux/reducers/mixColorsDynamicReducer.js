import MixColors from "../../Functions/MixColor";

const RESET_LEVEL_COLORS_DYNAMIC_MIX = "RESET_LEVEL_COLORS_DYNAMIC_MIX";
const REMOVE_USER_CHOSEN_COLOR_DYNAMIC_MIX =
  "REMOVE_USER_CHOSEN_COLOR_DYNAMIC_MIX";
const ADD_USER_CHOSEN_COLOR_DYNAMIC_MIX = "ADD_USER_CHOSEN_COLOR_DYNAMIC_MIX";
const SET_COLOR_AND_COLORS_USED_MIX_DYNAMIC =
  "SET_COLOR_AND_COLORS_USED_MIX_DYNAMIC";
const GENERATE_8_COLOR_PALETTE_AND_MIX = "GENERATE_8_COLOR_PALETTE_AND_MIX";
const GENERATE_10_COLOR_PALETTE_AND_MIX = "GENERATE_10_COLOR_PALETTE_AND_MIX";
const GENERATE_12_COLOR_PALETTE_AND_MIX = "GENERATE_12_COLOR_PALETTE_AND_MIX";

const currentState = {
  colorPalette: [
    ["#EA4335", "#4285F4"],
    ["#FBBC05", "#34A853"],
    ["#942EBE", "#00ECFA"],
    ["#F8712E", "#181762"],
    ["#FFC6E3", "#696969"],
  ],
  colorToMix: "#AFDC13",
  colorsChosen: [],
  previousColor: "",
  currentColorGuessed: "",
  numColors: 0,
  answer: [],
};

export default (state = currentState, action) => {
  switch (action.type) {
    case RESET_LEVEL_COLORS_DYNAMIC_MIX:
      currentState.colorsChosen = [];
      currentState.previousColor = "";
      currentState.currentColorGuessed = "";
      return { ...currentState };
    case REMOVE_USER_CHOSEN_COLOR_DYNAMIC_MIX:
      currentState.colorsChosen.splice(
        currentState.colorsChosen.indexOf(action.payload),
        1
      );
      return { ...currentState };
    case ADD_USER_CHOSEN_COLOR_DYNAMIC_MIX:
      currentState.colorsChosen.push(action.payload);
      return { ...currentState };
    case SET_COLOR_AND_COLORS_USED_MIX_DYNAMIC:
      currentState.previousColor = currentState.currentColorGuessed.trim();
      currentState.currentColorGuessed = action.payload.currentColorGuessed.trim();
      currentState.colorsChosen = action.payload.colorsChosen;
      return { ...currentState };
    case GENERATE_8_COLOR_PALETTE_AND_MIX:
      createPalette(8);
      return { ...currentState };
    case GENERATE_10_COLOR_PALETTE_AND_MIX:
      createPalette(10);
      return { ...currentState };
    case GENERATE_12_COLOR_PALETTE_AND_MIX:
      createPalette(12);
      return { ...currentState };
    default:
      return state;
  }
};

function createNewColor() {
  let hexCode = "#";
  while (hexCode.length < 7) {
    hexCode += Math.round(Math.random() * 15).toString(16);
  }
  // The color mixing function cannot handle #000000,
  // so return some random color if this is generated
  if (hexCode === "#000000") return "#02A10B";
  return hexCode.toUpperCase();
}

function createPalette(num) {
  let cols = num / 2;
  let palette = [];
  for (let i = 0; i < cols; i++) {
    let palRow = [];
    for (let j = 0; j < 2; j++) {
      let newColor = createNewColor();
      palRow.push(newColor);
    }
    palette.push(palRow);
  }
  currentState.colorPalette = palette;
  generateTargetColor(palette);
}

function generateTargetColor(arr) {
  let numColorsToMix = generateRandomNumber(2, 3);
  currentState.numColors = numColorsToMix;
  let placeInArray = [];
  let alreadyChosen = [];
  for (let i = 0; i < numColorsToMix; i++) {
    let row = generateRandomNumber(0, arr.length - 1);
    let col = generateRandomNumber(0, 1);
    let color = arr[row][col];
    while (alreadyChosen.includes(color)) {
      row = generateRandomNumber(0, arr.length - 1);
      col = generateRandomNumber(0, 1);
      color = arr[row][col];
    }
    alreadyChosen.push(color);
    placeInArray.push([row, col]);
  }
  let colorsToMix = [];
  for (let i = 0; i < placeInArray.length; i++) {
    colorsToMix[i] = arr[placeInArray[i][0]][placeInArray[i][1]];
  }
  currentState.answer = colorsToMix;
  let targetColor = MixColors(colorsToMix);
  currentState.colorToMix = targetColor.toUpperCase();
}

function generateRandomNumber(lowNum, highNum) {
  return Math.floor(Math.random() * (highNum - lowNum + 1)) + lowNum;
}
