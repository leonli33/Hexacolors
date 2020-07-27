import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../../Constants/Colors";

const ColorOption = (props) => {

  return (
    <TouchableOpacity
      onPress={() =>
        props.hiddenColors.includes(props.color)
          ? ""
          : props.pressed(props.color)
      }
      style={{
        ...styles.colorBall,
        backgroundColor: props.hiddenColors.includes(props.color)
          ? Colors.buttonBackground
          : props.color,
        opacity: !props.hiddenColors.includes(props.color)
          ? 1
          : 0,
        shadowColor: props.hiddenColors.includes(props.color)
          ? Colors.buttonBackground
          : "black",
        elevation: props.hiddenColors.includes(props.color) ? 0 : 3,
        borderWidth: props.hiddenColors.includes(props.color) ? 0 : 1,
      }}
    />
  );
};

const styles = StyleSheet.create({
  colorBall: {
    height: Math.round(Dimensions.get("window").height / 8.3),
    width: Math.round(Dimensions.get("window").height / 8.3),
    borderRadius: Math.round(Dimensions.get("window").height / 16),
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderWidth: 1,
    marginBottom: 5,
  },
});

export default ColorOption;
