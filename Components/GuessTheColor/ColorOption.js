import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import Colors from "../../Constants/Colors";

const ColorOption = (props) => {
  const state = {
    colorCircleToFade: new Animated.Value(1),
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  function fadeOut() {
    Animated.timing(state.colorCircleToFade, {
      toValue: 0,
      timing: 500,
    }).start();
  }

  if (props.lastGuessedColor === props.color) {
    fadeOut();
  }

  return (
    <AnimatedTouchable
      onPress={() =>
        props.hiddenColors.includes(props.color)
          ? ""
          : props.pressed(props.color)
      }
      style={{
        ...styles.colorBall,
        backgroundColor:
          props.hiddenColors.includes(props.color) &&
          props.lastGuessedColor != props.color
            ? Colors.buttonBackground
            : props.color,
        opacity: state.colorCircleToFade,
        shadowColor:
          props.hiddenColors.includes(props.color) &&
          props.lastGuessedColor != props.color
            ? Colors.buttonBackground
            : "black",
        elevation:
          props.hiddenColors.includes(props.color) &&
          props.lastGuessedColor != props.color
            ? 0
            : 6,
      }}
    ></AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  colorBall: {
    height: Math.round(Dimensions.get("window").height / 8),
    width: Math.round(Dimensions.get("window").height / 8),
    borderRadius: Math.round(Dimensions.get("window").height / 16),
    backgroundColor: "lightblue",
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: Math.round(Dimensions.get("window").height / 20),
  },
});

export default ColorOption;
