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
  return {
    type: "INCREMENT_FURTHEST_LEVEL",
    payload: level,
  };
};
