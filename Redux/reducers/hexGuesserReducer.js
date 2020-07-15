const CREATE_COLOR_TO_GUESS = "CREATE_COLOR_TO_GUESS";
const GENERATE_EASY_GUESS_OPTIONS = "GENERATE_EASY_GUESS_OPTIONS";
const GENERATE_MEDIUM_GUESS_OPTIONS = "GENERATE_MEDIUM_GUESS_OPTIONS";
const GENERATE_HARD_GUESS_OPTIONS = "GENERATE_HARD_GUESS_OPTIONS";

const currentState = {
  // Target color that is to be guessed
  targetColorToGuess: "",

  guessHexEasyColorOptions: [],

  guessHexMediumColorOptions: [],

  guessHexHardColorOptions: [],

  allColorsGuessed: [],
};

export default (state = currentState, action) => {
  switch (action.type) {
    case CREATE_COLOR_TO_GUESS:
      currentState.targetColorToGuess = createNewColor();
      return { ...currentState };
    case GENERATE_EASY_GUESS_OPTIONS:
      currentState.guessHexEasyColorOptions = generateEasyColorOptions();
      return { ...currentState };
    case GENERATE_MEDIUM_GUESS_OPTIONS:
      currentState.guessHexMediumColorOptions = generateMediumColorOptions();
      return { ...currentState };
    case GENERATE_HARD_GUESS_OPTIONS:
      currentState.guessHexHardColorOptions = genderateHardColorOptions();
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
  return hexCode.toUpperCase();
}

function generateEasyColorOptions() {
  let options = [];
  let targetColor = currentState.targetColorToGuess;
  for (let i = 0; i < 3; i++) {
    let pair = [];
    for (let j = 0; j < 2; j++) {
      let newColor = createNewColor();
      pair.push(newColor);
    }
    options.push(pair);
  }
  // set the first element to be the answer
  options[0][0] = targetColor;
  // shuffle the first array
  shuffleArray(options[0]);
  // shuffle the entire array
  shuffleArray(options);
  return options;
}

function generateMediumColorOptions() {
  let options = [];
  let targetColor = currentState.targetColorToGuess;
  for (let i = 0; i < 5; i++) {
    let pair = [];
    for (let j = 0; j < 2; j++) {
      let newColor = createNewColor();
      pair.push(newColor);
    }
    options.push(pair);
  }
  // set the first element to be the answer
  options[0][0] = targetColor;
  // shuffle the first array
  shuffleArray(options[0]);
  // shuffle the entire array
  shuffleArray(options);
  return options;
}

function genderateHardColorOptions() {
  let options = [];
  let targetColor = currentState.targetColorToGuess;
  for (let i = 0; i < 7; i++) {
    let pair = [];
    for (let j = 0; j < 2; j++) {
      let newColor = createNewColor();
      pair.push(newColor);
    }
    options.push(pair);
  }
  // set the first element to be the answer
  options[0][0] = targetColor;
  // shuffle the first array
  shuffleArray(options[0]);
  // shuffle the entire array
  shuffleArray(options);
  return options;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
