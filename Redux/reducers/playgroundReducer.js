const ADD_COLOR_TO_PLAYGROUND_LIST = "ADD_COLOR_TO_PLAYGROUND_LIST";
const REMOVE_COLOR_FROM_PLAYGROUND_LIST = "REMOVE_COLOR_FROM_PLAYGROUND_LIST";
const RESET_PLAYGROUND_COLORS = "RESET_PLAYGROUND_COLORS";
const ADD_USER_CHOSEN_COLOR_PLAYGROUND = "ADD_USER_CHOSEN_COLOR_PLAYGROUND";
const REMOVE_USER_CHOSEN_COLOR_PLAYGROUND =
  "REMOVE_USER_CHOSEN_COLOR_PLAYGROUND";

const currentState = {
  playgroundModePalette: [
    ["#EA4335", "#4285F4", "#FFED1C", "#34A853"],
    ["#942EBE", "#00ECFA", "#F8712E", "#181762"],
  ],
  paletteColorsSet: new Set([
    "#EA4335",
    "#4285F4",
    "#FFED1C",
    "#34A853",
    "#942EBE",
    "#00ECFA",
    "#F8712E",
    "#181762",
  ]),
  currentColorsChosen: [],
};

export default (state = currentState, action) => {
  switch (action.type) {
    case ADD_COLOR_TO_PLAYGROUND_LIST:
      addColorToPalette(action.payload);
      return { ...currentState };
    case REMOVE_COLOR_FROM_PLAYGROUND_LIST:
      removeColorsFromPalette(action.payload);
      return { ...currentState };
    case RESET_PLAYGROUND_COLORS:
      currentState.currentColorsChosen = [];
      return { ...currentState };
    case ADD_USER_CHOSEN_COLOR_PLAYGROUND:
      currentState.currentColorsChosen.push(action.payload);
      return { ...currentState };
    case REMOVE_USER_CHOSEN_COLOR_PLAYGROUND:
      currentState.currentColorsChosen.splice(
        currentState.currentColorsChosen.indexOf(action.payload),
        1
      );
      return { ...currentState };
    default:
      return state;
  }
};

function removeColorsFromPalette(colors) {
  // remove the colors from the set and construct a
  // new array
  for (color of colors) currentState.paletteColorsSet.delete(color);

  let currentCount = 0;
  let colorArr = ["", "", "", ""];
  let newColorElements = [];

  currentState.paletteColorsSet.forEach((currentColor) => {
    if (currentCount === 4) {
      newColorElements.push(colorArr);
      colorArr = ["", "", "", ""];
      currentCount = 0;
    }
    colorArr[currentCount] = currentColor;
    currentCount++;
  });

  if (colorArr[0]) newColorElements.push(colorArr);

  currentState.playgroundModePalette = newColorElements;
}

function addColorToPalette(color) {
  if (currentState.paletteColorsSet.has(color)) {
    alert("This color is already present in your palette");
  } else {
    let len = currentState.playgroundModePalette.length;
    if (len === 0) {
      let colorArr = [color, "", "", ""];
      currentState.playgroundModePalette.push(colorArr);
    } else {
      let lastColorArray = currentState.playgroundModePalette[len - 1];
      let spaceAvailable = false;
      for (let i = 0; i < 4; i++) {
        let colorArr = lastColorArray[i];
        if (colorArr === "") {
          spaceAvailable = true;
          lastColorArray[i] = color;
          break;
        }
      }
      if (!spaceAvailable) {
        let newColorRow = [color, "", "", ""];
        currentState.playgroundModePalette.push(newColorRow);
      }
    }

    currentState.paletteColorsSet.add(color);
  }
}
